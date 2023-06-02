from . import views
from django.urls import path

urlpatterns = [
    path('title/', views.title_view, name='title'),
    path('diff_select/', views.diff_select_view, name='diff_select'),
    path('how_to_play/', views.how_to_play_view, name='how_to_play'),
]