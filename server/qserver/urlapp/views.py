from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import permissions
from .models import Url, Folder
from .serializers import FolderSerializer, UrlSerializer
from django.db import models
from django.dispatch import receiver
import os
import metadata_parser
from io import BytesIO
<<<<<<< HEAD
=======
import magic
>>>>>>> ca8985939910ba98f630de6b9cfe5b718b3fb554
import requests
from django.core.files import File
from urllib.parse import urlparse
# Create your views here.
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user

class FolderViewSet(viewsets.ModelViewSet):
    #queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(user = user)
    @action(detail=False)
    def folderlist(self, request):
<<<<<<< HEAD
=======
        #fo = self.get_object()
        #print(fo.user)
>>>>>>> ca8985939910ba98f630de6b9cfe5b718b3fb554
        user = self.request.user
        folderList = Folder.objects.filter(user = user)
        page = self.paginate_queryset(folderList)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(folderList, many=True)
        return Response(serializer.data)


<<<<<<< HEAD
=======
# url로부터 파일을 임시 다운로드
def download(url):
    response = requests.get(url)
    binary_data = response.content
    temp_file = BytesIO()
    temp_file.write(binary_data)
    temp_file.seek(0)
    return temp_file

# 파일 확장자 추출
def get_buffer_ext(buffer):
    buffer.seek(0)
    mime_info = magic.from_buffer(buffer.read(), mime=True)
    buffer.seek(0)
    return mime_info.split('/')[-1]
>>>>>>> ca8985939910ba98f630de6b9cfe5b718b3fb554

class UrlViewSet(viewsets.ModelViewSet):
    #queryset = Url.objects.all()
    serializer_class = UrlSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def get_queryset(self):
        user = self.request.user
        folder = self.request.GET['name']
        print(folder)
        return Url.objects.filter(user__username = user, folder__name = folder)    
    def perform_create(self, serializer):
        print(self.request.data["link"])
        page = metadata_parser.MetadataParser(self.request.data["link"])
        serializer.save(
            user=self.request.user, 
            title=page.get_metadatas("title", strategy=['og'])[0],
            body=page.get_metadatas("description", strategy=['og'])[0],
            image_url=page.get_metadatas("image", strategy=['og'])[0],
        )
    def get(self, request, *args, **kwargs):
<<<<<<< HEAD
        return self.list(request, *args, **kwargs)
=======
        return self.list(request, *args, **kwargs)
# @api_view(['GET']) # 해당 함수 view에서 처리할 http 메소드
# def ClipAPI(request):
#     #user = 
#     return Response("hello world!") # http response 형태로 return
>>>>>>> ca8985939910ba98f630de6b9cfe5b718b3fb554
