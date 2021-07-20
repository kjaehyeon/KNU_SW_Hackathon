from django.urls import path, include
#from .views import HelloAPI
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('cliplist', views.FolderViewSet, basename="Folder")
router.register('clip', views.UrlViewSet, basename="url")

urlpatterns = [
    #path("clip/", views.ClipAPI),
    path("", include(router.urls))
]