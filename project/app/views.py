from django.shortcuts import render, redirect
from .forms import SignupForm, LoginForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import ScoreData
# from django.views.decorators.csrf import csrf_protect

import os
import shutil
import cv2

import torch
import torch.nn as nn
from torchvision import transforms
import torch.utils.data as data


import app.cnn as cnn
import app.data_prep as data_prep
import app.train as train



transform = transforms.Compose([transforms.ToTensor()])

softmax = nn.Softmax(dim=1)
threshold = 0.5

cnn_dict = {}
cnt_dict = {}






class RealtimeDataset(data.Dataset):
    def __init__(self, img, transform):
        self.img = img
        self.transform = transform

    def __len__(self):
        return 1

    def __getitem__(self, index):
        return self.transform(self.img)








def index(req):
    return render(req, 'index.html')

def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            print(request)
            user = request.user
            param = {
                'users':user
            }
            return redirect('app:title')

    else:
        form = SignupForm()

    param = {
        'form': form
    }
    return render(request, 'signup.html', param)

def title(request):
    return render(request, 'title.html')

def HowToPlay(request):
    return render(request, 'How-to-Play.html')

def Diffsec(request):
    return render(request, 'Difficulty-Selection.html')

def gameEasy(request):
    return render(request, 'game_easy.html')

def gameNormal(request):
    return render(request, 'game_normal.html')

def gameHard(request):
    return render(request, 'game_hard.html')

def login_view(request):
    if request.method == 'POST':
        next = request.POST.get('next')
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            user = form.get_user()

            if user:
                login(request, user)
                if next == 'None':
                    user = request.user
                    param = {
                        'user':user
                    }
                    return redirect('app:title')
                else:
                    return redirect(to=next)
    else:
        form = LoginForm()
        next = request.GET.get('next')

    param = {
        'form': form,
        'next': next
    }

    return render(request, 'login.html', param)

# @csrf_exempt
def save_data(request):
    tags = request.POST.getlist('tags[]')

    try:
        if int(tags[1]) > ScoreData.objects.get(name=tags[0]).score:
            new_data = ScoreData.objects.get(name=tags[0])
            new_data.score = tags[1]
            new_data.save()
    except ScoreData.DoesNotExist:
        new_data = ScoreData(name=tags[0],score=tags[1])
        new_data.save()

    temp = {'success': tags}
    return JsonResponse(temp)


def logout_view(request):
    logout(request)

    return render(request, 'index.html')

@login_required
def user_view(request):
    user = request.user

    params = {
        'user': user
    }

    return render(request, 'user.html', params)

@login_required
def other_view(request):
    users = User.objects.exclude(username=request.user.username)

    params = {
        'users': users
    }

    return render(request, 'other.html', params)


def move_balance(request):
    return render(request, 'training.html')

def move_ranking(request):
    #rankingデータの取得
    raking_datas = ScoreData.objects.all()
    return render(request, 'ranking.html',{'ranking_list':raking_datas})







def get_data(request):
    global cnn_dict, cnt_dict
    dtype = request.POST.get('type')
    user = request.POST.get('user')
    if 'img' in request.FILES:
        file = request.FILES['img']
    batch_size = 1

    if dtype == 'temp':
        net = cnn_dict[user]
        file_name = f'app/image/{user}/temp/image.jpg'
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
        landmark = data_prep.detect_landmark(img)
        if landmark is None:
            d = {'result': 2}
        else:
            with torch.no_grad():
                eye_img = data_prep.eye_crop(img, landmark)
                dataset = RealtimeDataset(eye_img, transform)
                dataloader = torch.utils.data.DataLoader(dataset, batch_size=batch_size)
                temp_img = dataloader.__iter__()
                input_img = next(temp_img)
                output_net = net(input_img)
                output_softmax = softmax(output_net).squeeze().tolist()
                if output_softmax[1] > threshold:
                    d = {'result': 1}
                else:
                    d = {'result': 0}
        return JsonResponse(d)


    elif dtype == 'finish':
        file_name = f'app/image/{user}/temp/image.jpg'
        if os.path.exists(file_name):
            os.remove(file_name)
        d = {'success': True}
        return JsonResponse(d)


    elif dtype == 'training':
        if user not in cnn_dict:
            d = {'success': False}
            return JsonResponse(d)
        else:
            net = cnn_dict[user]

        train_file_list = data_prep.make_filepath_list(user)
        # print(train_file_list)

        train_dataset = data_prep.EyeDataset(file_list=train_file_list, transform=transform)

        batch_size = 4

        train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)

        max_epoch = 20
        finetune = train.Train(net, train_loader)
        finetune.training(max_epoch)

        d = {'success': True}
        shutil.rmtree(f'app/image/{user}/')
        os.makedirs(f'app/image/{user}/temp/', exist_ok=True)
        os.makedirs(f'app/image/{user}/train/0/', exist_ok=True)
        os.makedirs(f'app/image/{user}/train/1/', exist_ok=True)
        return JsonResponse(d)


    elif dtype == 'close':
        if os.path.isdir(f'app/image/{user}/'):
            shutil.rmtree(f'app/image/{user}/')
            os.makedirs(f'app/image/{user}/temp/', exist_ok=True)
            os.makedirs(f'app/image/{user}/train/0/', exist_ok=True)
            os.makedirs(f'app/image/{user}/train/1/', exist_ok=True)
        d = {'success': True}
        return JsonResponse(d)


    elif dtype == 'cnn':
        if user in cnn_dict:
            d = {'cnn': True}
        else:
            d = {'cnn': False}
        return JsonResponse(d)


    else:
        if user not in cnn_dict:
            cnn_dict[user] = cnn.CNN()
        if user not in cnt_dict:
            cnt_dict[user] = [0, 0]
        if not os.path.isdir(f'app/image/{user}/'):
            os.makedirs(f'app/image/{user}/temp/', exist_ok=True)
            os.makedirs(f'app/image/{user}/train/0/', exist_ok=True)
            os.makedirs(f'app/image/{user}/train/1/', exist_ok=True)
        if dtype == 'train-0':
            file_name = f'app/image/{user}/train/0/image_{cnt_dict[user][0]:05}.jpg'
            cnt_dict[user][0] += 1
        elif dtype == 'train-1':
            file_name = f'app/image/{user}/train/1/image_{cnt_dict[user][1]:05}.jpg'
            cnt_dict[user][1] += 1
        with open(file_name, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        d = {'success': True}
        return JsonResponse(d)

