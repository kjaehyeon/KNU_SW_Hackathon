from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns =[
    path('filelist/', views.FileList.as_view()),
    path('file/<int:pk>', views.FileDetail.as_view()),
    path('subject/', views.SubjectList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)