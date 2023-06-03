from django.urls import path
from . import views

app_name = 'touchtyperman'
urlpatterns = [
    path('', views.index, name='index'),
    path('ajax/', views.get_data, name='get_data')
]