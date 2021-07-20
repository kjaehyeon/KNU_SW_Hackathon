from django.urls import path, include
#from .views import HelloAPI
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('folder', views.FolderViewSet)
router.register('url', views.UrlViewSet)

urlpatterns = [
    #path("clip/", views.ClipAPI),
    path("", include(router.urls))
]