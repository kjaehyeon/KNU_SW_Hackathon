from .serializers import LectureFileSerializer, SubjectSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import LectureFile, Grade, Semester, Subject
from rest_framework import generics, mixins

from django.db import models
from django.dispatch import receiver
import os

class FileList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
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


class FileDetail(mixins.RetrieveModelMixin,mixins.DestroyModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = LectureFile.objects.all()
    serializer_class = LectureFileSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

#자동으로 저장된 파일 지우는 함수
@receiver(models.signals.post_delete, sender=LectureFile)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.file_data:
        if os.path.isfile(instance.file_data.path):
            os.remove(instance.file_data.path)

class SubjectList(mixins.CreateModelMixin, mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Subject.objects.all()
    serializer_class=SubjectSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


