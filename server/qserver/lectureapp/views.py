from .serializers import LectureFileSerializer
from django.shortcuts import render
from django.contrib.auth.models import User

from .models import LectureFile, Grade, Semester, Subject
from rest_framework import generics, mixins


class FileList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = LectureFileSerializer

    def get_queryset(self, request, *args, **kwargs):
        user = self.request.user
        subject = kwargs['subject']

        return LectureFile.objects.filter(subject=subject, user=user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)