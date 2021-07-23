from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('cliplist', views.FolderViewSet, basename="Folder")
router.register('clip', views.UrlViewSet, basename="url")

urlpatterns = [
    path("", include(router.urls))
]