from django.shortcuts import render
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt



import numpy as np
from PIL import Image
import time
import glob
import os
import shutil

import dlib
from imutils import face_utils
import cv2
import time

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms


import touchtyperman.cnn
import touchtyperman.data_prep
import touchtyperman.train





face_detector = dlib.get_frontal_face_detector()
predictor_path = 'touchtyperman/models/shape_predictor_68_face_landmarks.dat'
face_predictor = dlib.shape_predictor(predictor_path)

cnn_dict = {}
transform = transforms.Compose([transforms.ToTensor()])

softmax = nn.Softmax(dim=1)

cnt_dict = {}




# Create your views here.



def index(request):
    return render(request, 'index.html')










# cnt_0 = 0
# cnt_1 = 0
# cnt_2 = 0


# @csrf_exempt
def get_data(request):
    global cnn_dict, cnt_dict
    dtype = request.POST.get('type')
    user = request.POST.get('user')
    file = request.FILES['img']


    if dtype == 'temp':
        net = cnn_dict[user]
        file_name = f'touchtyperman/img/{user}/temp/image.jpg'
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
        landmark = data_prep.detect_landmark(img)
        if landmark is None:
            d = {'result': 2}
        else:
            eye_img = data_prep.eye_crop(img, landmark)
            transformed_img = transform(eye_img)
            output = softmax(net(transformed_img))
            d = {'success': output}
        os.remove(file_name)
        return JsonResponse(d)


    elif dtype == 'finetuning':
        if user not in cnn_dict:
            d = {'success': False}
            return JsonResponse(d)
        else:
            net = cnn_dict[user]

        train_file_list = data_prep.make_filepath_list(user)

        train_dataset = data_prep.EyeDataset(file_list=train_file_list, transform=transform)
        # test_dataset = data_prep.EyeDataset(file_list=test_file_list, transform=transform)

        batch_size = 4

        train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
        # test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=2, drop_last=False)

        max_epoch = 50
        finetune = train.Train(net, train_loader)
        finetune.training(max_epoch)

        d = {'success': True}
        shutil.rmtree(f'touchtyperman/img/{user}/')
        os.makedirs(f'touchtyperman/img/{user}/temp/', exist_ok=True)
        os.makedirs(f'touchtyperman/img/{user}/train/0/', exist_ok=True)
        os.makedirs(f'touchtyperman/img/{user}/train/1/', exist_ok=True)
        os.makedirs(f'touchtyperman/img/{user}/train/2/', exist_ok=True)
        return JsonResponse(d)


    else:
        if user not in cnn_dict:
            cnn_dict[user] = cnn.CNN()
        if user not in cnt_dict:
            cnt_dict[user] = [0, 0, 0]
        if not os.path.isdir(f'touchtyperman/img/{user}/'):
            os.makedirs(f'touchtyperman/img/{user}/temp/', exist_ok=True)
            os.makedirs(f'touchtyperman/img/{user}/train/0/', exist_ok=True)
            os.makedirs(f'touchtyperman/img/{user}/train/1/', exist_ok=True)
            os.makedirs(f'touchtyperman/img/{user}/train/2/', exist_ok=True)
        if dtype == 'train-0':
            file_name = f'touchtyperman/img/{user}/train/0/image_{cnt_dict[user][0]:05}.jpg'
            cnt_dict[user][0] += 1
        elif dtype == 'train-1':
            file_name = f'touchtyperman/img/{user}/train/1/image_{cnt_dict[user][1]:05}.jpg'
            cnt_dict[user][1] += 1
        else:
            file_name = f'touchtyperman/img/{user}/train/2/image_{cnt_dict[user][2]:05}.jpg'
            cnt_dict[user][2] += 1
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        d = {'success': True}
        return JsonResponse(d)

