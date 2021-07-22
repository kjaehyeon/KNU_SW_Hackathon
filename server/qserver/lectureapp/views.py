from .serializers import LectureFileSerializer, SubjectSerializer, GeneratedQuestionSerializer, WrongQuestionSerializer
from django.contrib.auth.models import User
from .models import LectureFile, Grade, Semester, Subject, GeneratedQuestion, WrongQuestion, get_valid_filename, WrongSubject
from rest_framework.views import APIView
from rest_framework import generics, mixins, status
from rest_framework.response import Response
from .question import MakeAndSaveQuestion
from rest_framework import permissions
from django.db import models
from django.dispatch import receiver
from rest_framework.parsers import MultiPartParser, FormParser
import json
import os

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

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
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):

        serializer.save(
            owner=self.request.user,
            name = get_valid_filename(self.request.POST['name'])
        )    

    def post(self, request, *args, **kwargs):
        retval = self.create(request, *args, **kwargs)
       
        MakeAndSaveQuestion(
            file_name=self.request.POST['name'], 
            grade=self.request.POST['grade'],
            subject=self.request.POST['subject'],
            semester=self.request.POST['semester'],
            owner = self.request.user
        )
        
        return retval
    
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
    serializer_class=SubjectSerializer

    def get_queryset(self):
        user = self.request.user
        return Subject.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class QuizList(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class=GeneratedQuestionSerializer

    def get_queryset(self):
        grade= int(self.request.GET['grade'])
        semester= int(self.request.GET['semester'])
        subject = int(self.request.GET['subject'])
        file = self.request.GET['name']
        user = self.request.user
        return GeneratedQuestion.objects.filter(
            owner__username=user, 
            subject=subject,
            semester=semester, 
            grade=grade,
            source_file__name=file
        )
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class WrongList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class=WrongQuestionSerializer

    def get_queryset(self):
        subject = self.request.GET['subject']
        owner = self.request.user

        return WrongQuestion.objects.filter(owner__username=owner, wrongsubject__name=subject)

    def perform_create(self, serializer,wrong=None):
        serializer.save(
            owner=self.request.user,
            wrongsubject=wrong,
        )

    def create(self, request):
        is_many = isinstance(request.data, list)

        serializer = self.get_serializer(data=request.data, many=is_many)
        subject = Subject.objects.get(pk=request.data[0]["subject"])
        if not WrongSubject.objects.filter(name=subject.name, owner=self.request.user):
            wrong=WrongSubject.objects.create(name=subject.name, owner=self.request.user)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer,wrong)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

