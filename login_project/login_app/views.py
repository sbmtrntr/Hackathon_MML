from django.shortcuts import render, redirect
from .forms import SignupForm, LoginForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

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
    return render(request, 'login_app/game_hard.html')

def gameHard(request):
    return render(request, 'login_app/game_nightmare.html')

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

def logout_view(request):
    logout(request)

    return render(request, 'login_app/index.html')

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