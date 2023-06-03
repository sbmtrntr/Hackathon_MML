from django.shortcuts import render, redirect
from .forms import SignupForm, LoginForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import ScoreData
from django.views.decorators.csrf import csrf_protect

def index(req):
    return render(req, 'login_app/index.html')

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
            # return redirect(to='/user/')
            # return render (request,'login_app/title.html?name='+user,param)
            return redirect('login_app:title')

    else:
        form = SignupForm()
    
    param = {
        'form': form
    }

    return render(request, 'login_app/signup.html', param)

def title(request):
    return render(request, 'login_app/title.html')

def title2(request):
    return render(request, 'login_app/title2.html')

def HowToPlay(request):
    return render(request, 'login_app/How-to-Play.html')

def Diffsec(request):
    return render(request, 'login_app/Difficulty-Selection.html')

def gameEasy(request):
    return render(request, 'login_app/game_easy.html')

def gameNormal(request):
    return render(request, 'login_app/game_normal.html')

def gameHard(request):
    return render(request, 'login_app/game_hard.html')

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
                    # return redirect(to='/user/')
                    # return render (request,'login_app/title.html',param)
                    return redirect('login_app:title')
                else:
                    return redirect(to=next)
    else:
        form = LoginForm()
        next = request.GET.get('next')

    param = {
        'form': form,
        'next': next
    }

    return render(request, 'login_app/login.html', param)

# @csrf_exempt
def save_data(request):
    tags = request.POST.getlist("tags[]")
    if ScoreData.objects.get(name=tags[0]) != None:
        if int(tags[1]) > ScoreData.objects.get(name=tags[0]).score:
            new_data = ScoreData.objects.get(name=tags[0])
            new_data.score = tags[1]
            new_data.save()
    else:
        new_data = ScoreData(name=tags[0],score=tags[1])
        new_data.save()

    #if ScoreData.objects.get(name=tags[0]):        

    temp = {'success': tags}
    return JsonResponse(temp)


def logout_view(request):
    logout(request)

    return render(request, 'login_app/logout.html')

@login_required
def user_view(request):
    user = request.user

    params = {
        'user': user
    }

    return render(request, 'login_app/user.html', params)

@login_required
def other_view(request):
    users = User.objects.exclude(username=request.user.username)

    params = {
        'users': users
    }

    return render(request, 'login_app/other.html', params)


def move_balance(request):
    return render(request, 'login_app/FineTuning.html')

def move_ranking(request):
    #rankingデータの取得
    raking_datas = ScoreData.objects.all()
    return render(request, 'login_app/ranking.html',{'ranking_list':raking_datas})

cnt_0 = 0
cnt_1 = 0


# @csrf_protect
# def get_data(request):
#     global cnt_0, cnt_1
#     dtype = request.POST.get('type')
#     file = request.FILES['img']


#     if dtype == 'temp':
#         file_name = 'login_app/img/temp/image.jpg'
#         with open(file_name, 'wb+') as f:
#             for chunk in file.chunks():
#                 f.write(chunk)
#         # img = cv2.imread(file_name, cv2.IMREAD_GRAYSCALE)
#         # landmark = detect_landmark(img)
#         # if landmark is None:
#         #     d = {'result': 2}
#         # else:
#         #     test_img0 = transform(Image.open('touchtyperman/img/faces/image0.jpg').convert('L'))
#         #     test_img1 = transform(Image.open('touchtyperman/img/faces/image1.jpg').convert('L'))
#         #     # test_img2 = transform(Image.open('touchtyperman/img/faces/image2.jpg').convert('L'))
#         #     face_img = draw(landmark, img)
#         #     cos0 = cos(torch.flatten(face_img), torch.flatten(test_img0)).item()
#         #     cos1 = cos(torch.flatten(face_img), torch.flatten(test_img1)).item()
#         #     # cos2 = cos(torch.flatten(face_img), torch.flatten(test_img2)).item()
#         #     if cos0 > cos1 + 0.003:
#         #         d = {'result': 0, 'cos0': cos0, 'cos1': cos1}
#         #     else:
#         #         d = {'result': 1, 'cos0': cos0, 'cos1': cos1}
#         d = {'success': True}
#         return JsonResponse(d)

#     else:
#         if dtype == 'face-0':
#             file_name = f'touchtyperman/img/train/0/image_{cnt_0:05}.jpg'
#             cnt_0 += 1
#         else:
#             file_name = f'touchtyperman/img/train/1/image_{cnt_1:05}.jpg'
#             cnt_1 += 1
#         with open(file_name, 'wb+') as f:
#             for chunk in file.chunks():
#                 f.write(chunk)
#         d = {'success': True}
#         # print(cnt)
#         return JsonResponse(d)