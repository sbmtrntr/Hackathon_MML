from . import views
from django.urls import path

app_name = 'login_app'

urlpatterns = [
    path(r'', views.index, name='index'),
    path('signup', views.signup_view, name='signup'),
    # path('login/', views.login_view, name='login'),
    path('title/', views.title, name='title'),
    path('login', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('user', views.user_view, name='user'),
    path('other/', views.other_view, name='other'),
    path('howToPlay',views.HowToPlay, name='howToPlay'),
    path('diffsec', views.Diffsec, name='diffsec')
]