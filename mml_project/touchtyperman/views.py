from django.shortcuts import render
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt



import numpy as np
from PIL import Image
import time
import glob

import dlib
from imutils import face_utils
import cv2
import time

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms


import cnn





# face_detector = dlib.get_frontal_face_detector()
# predictor_path = 'touchtyperman/models/shape_predictor_68_face_landmarks.dat'
# face_predictor = dlib.shape_predictor(predictor_path)


transform = transforms.Compose([transforms.ToTensor()])

net = cnn.CNN()
net.load_state_dict(torch.load('ouchtyperman/models/params/model_weight.pth'))




# Create your views here.



def index(request):
    return render(request, 'index.html')











# def detect_landmark(img):
#     faces = face_detector(img, 1)
#     if len(faces) == 0:
#         return None
#     else:
#         landmark = face_predictor(img, faces[0])
#         landmark = face_utils.shape_to_np(landmark)
#         return landmark





# def eye_crop(img, landmark):
#     left_x = landmark[0][0] - 3
#     right_x = landmark[16][0] + 3
#     top_y = max([landmark[19][1], landmark[24][1]]) - 3
#     bottom_y = landmark[8][1] + 3

#     face_region = {'left_x': left_x, 'right_x': right_x,'top_y': top_y, 'bottom_y': bottom_y}


#     # right_eye_region = {'left_x': landmark[36][0] - 5, 'right_x': landmark[39][0] + 3,
#     #                     'top_y': landmark[37][1] - 3 if landmark[37][1] < landmark[38][1] else landmark[38][1] - 3,
#     #                     'bottom_y': landmark[41][1] + 3 if landmark[41][1] > landmark[40][1] else landmark[40][1] + 3}

#     # left_eye_region = {'left_x': landmark[42][0] - 3, 'right_x': landmark[45][0] + 5,
#     #                    'top_y': landmark[43][1] - 3 if landmark[43][1] < landmark[45][1] else landmark[45][1] - 3,
#     #                    'bottom_y': landmark[47][1] + 3 if landmark[47][1] > landmark[46][1] else landmark[46][1] + 3}

#     eye_region = {'left_x': landmark[36][0] - 5, 'right_x': landmark[45][0] + 5,
#                   'top_y': max(landmark[19][1], landmark[24][1]) - 3,
#                 #   'top_y': max(landmark[37][1], landmark[38][1], landmark[43][1], landmark[44][1]) - 3,
#                   'bottom_y': max(landmark[40][1], landmark[41][1], landmark[46][1], landmark[47][1]) + 3}


#     # right_cropped_img = img[right_eye_region['top_y']:right_eye_region['bottom_y'], right_eye_region['left_x']:right_eye_region['right_x']]
#     # left_cropped_img = img[left_eye_region['top_y']:left_eye_region['bottom_y'], left_eye_region['left_x']:left_eye_region['right_x']]

#     cropped_img = img[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']]
#     print(cropped_img.shape)

#     return cropped_img, eye_region, face_region
#     # return right_cropped_img, left_cropped_img, right_eye_region, left_eye_region, face_region




# def draw(landmark, img):
#     face_outline = list(landmark[:17])
#     face_outline.extend(reversed(list(landmark[17:27])))

#     new_img = np.full((1020, 720), 255, np.uint8)
#     for i in range(len(face_outline)):
#         if i == len(face_outline) - 1:
#             cv2.line(new_img, pt1=face_outline[i], pt2=face_outline[0], color=(0, 0, 0), thickness=2)
#         else:
#             cv2.line(new_img, pt1=face_outline[i], pt2=face_outline[i+1], color=(0, 0, 0), thickness=2)

#     # right_eye_img, left_eye_img, right_eye_region, left_eye_region, face_region = eye_crop(img, landmark)
#     eye_img, eye_region, face_region = eye_crop(img, landmark)
#     # new_img[right_eye_region['top_y']:right_eye_region['bottom_y'], right_eye_region['left_x']:right_eye_region['right_x']] = right_eye_img
#     # new_img[left_eye_region['top_y']:left_eye_region['bottom_y'], left_eye_region['left_x']:left_eye_region['right_x']] = left_eye_img
#     print(new_img[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']].shape)
#     new_img[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']] = eye_img

#     face_img = new_img[face_region['top_y']:face_region['bottom_y'], face_region['left_x']:face_region['right_x']]

#     # return transform(Image.fromarray(face_img))







# def test(file_list, eye_img0):
#     cos = nn.CosineSimilarity(dim=0)
#     for i, f in enumerate(file_list):
#         img = cv2.imread(f, cv2.IMREAD_GRAYSCALE)
#         landmark = detect_landmark(img)
#         if landmark is not None:
#             # eye_img = eye_crop(img, landmark, transform)
#             eye_img = draw(landmark, img)
#             result = cos(torch.flatten(eye_img0), torch.flatten(eye_img)).item()
#             print(f'{result:.6f}\t{i}\t{result < 0.96}\t{f}')










cnt_0 = 0
cnt_1 = 0


# @csrf_exempt
def get_data(request):
    global cnt_train, cnt_test
    dtype = request.POST.get('type')
    file = request.FILES['img']


    if dtype == 'temp':
        file_name = 'touchtyperman/img/temp/image.jpg'
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        # img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
        # landmark = detect_landmark(img)
        # if landmark is None:
        #     d = {'result': 2}
        # else:
        #     test_img0 = transform(Image.open('touchtyperman/img/faces/image0.jpg').convert('L'))
        #     test_img1 = transform(Image.open('touchtyperman/img/faces/image1.jpg').convert('L'))
        #     # test_img2 = transform(Image.open('touchtyperman/img/faces/image2.jpg').convert('L'))
        #     face_img = draw(landmark, img)
        #     cos0 = cos(torch.flatten(face_img), torch.flatten(test_img0)).item()
        #     cos1 = cos(torch.flatten(face_img), torch.flatten(test_img1)).item()
        #     # cos2 = cos(torch.flatten(face_img), torch.flatten(test_img2)).item()
        #     if cos0 > cos1 + 0.003:
        #         d = {'result': 0, 'cos0': cos0, 'cos1': cos1}
        #     else:
        #         d = {'result': 1, 'cos0': cos0, 'cos1': cos1}
        d = {'success': True}
        return JsonResponse(d)

    else:
        if dtype == 'face-0':
            file_name = f'touchtyperman/img/train/0/image_{cnt_0:05}.jpg'
        else:
            file_name = f'touchtyperman/img/train/1/image_{cnt_1:05}.jpg'
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        d = {'success': True}
        cnt += 1
        # print(cnt)
        return JsonResponse(d)

