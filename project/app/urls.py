from . import views
from django.urls import path

app_name = 'app'

urlpatterns = [
    path('', views.index, name='index'),
    path('signup', views.signup_view, name='signup'),
    path('title', views.title, name='title'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('user', views.user_view, name='user'),
    path('other', views.other_view, name='other'),
    path('howToPlay',views.HowToPlay, name='howToPlay'),
    path('diffsec', views.Diffsec, name='diffsec'),
    path('gameEasy',views.gameEasy, name='gameEasy'),
    path('gameNormal',views.gameNormal,name='gameNormal'),
    path('gameHard',views.gameHard,name='gameHard'),
    path('ajax', views.get_data, name='get_data'),
    path('savedata',views.save_data, name='save_data'),
    path('training',views.move_balance,name='training'),
    path('ranking',views.move_ranking,name='ranking'),
]