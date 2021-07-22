from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from knox import views as knox_views



urlpatterns = [
    path('', include('knox.urls')),
    path('register', views.RegisterAPI.as_view()),
    path('login', views.LoginAPI.as_view()),
    path('user', views.UserAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]