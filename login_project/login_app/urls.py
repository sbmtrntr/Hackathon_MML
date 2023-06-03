from . import views
from django.urls import path

app_name = 'login_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup_view, name='signup'),
    path('title/', views.title, name='title'),
    path('title2/', views.title2, name='title2'),
    path('login', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user', views.user_view, name='user'),
    path('other/', views.other_view, name='other'),
    path('howToPlay',views.HowToPlay, name='howToPlay'),
    path('diffsec', views.Diffsec, name='diffsec'),
    path('gameEasy',views.gameEasy, name='gameEasy'),
    path('gameNormal',views.gameNormal,name='gameNormal'),
    path('gameHard',views.gameHard,name='gameHard'),
]