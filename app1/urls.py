from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('app1/call_click/', views.call_click),
    path('app1/update_boost/', views.update_boost),
    path('register/', views.register, name='register'),
    #path('login/', views.login, name='login')
]