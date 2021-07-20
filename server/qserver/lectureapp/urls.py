from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns =[
    path('filelist/', views.FileList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)