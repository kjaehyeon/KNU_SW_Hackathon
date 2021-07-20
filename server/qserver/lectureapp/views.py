from .serializers import LectureFileSerializer
from django.shortcuts import render
from django.contrib.auth.models import User

from .models import LectureFile, Grade, Semester, Subject
from rest_framework import generics, mixins


class FileList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    #queryset = LectureFile.objects.all()
    serializer_class = LectureFileSerializer
    def get_queryset(self):
        grade = self.request.GET['grade']
        semester = self.request.GET['semester']
        subject = self.request.GET['subject']
        user=self.request.user
        
        return LectureFile.objects.filter(owner__username=user, subject__name=subject, grade__name=grade, semester__name=semester)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FileDetail(mixins.DestroyModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
