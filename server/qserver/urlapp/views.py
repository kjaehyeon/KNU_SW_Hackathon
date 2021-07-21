from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Url, Folder
from .serializers import FolderSerializer, UrlSerializer
# Create your views here.

class FolderViewSet(viewsets.ModelViewSet):
    #queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    def get_queryset(self):
        user = self.request.user
        return Folder.objects.filter(user = user)
    @action(detail=False)
    def folderlist(self, request):
        #fo = self.get_object()
        #print(fo.user)
        user = self.request.user
        folderList = Folder.objects.filter(user = user)
        page = self.paginate_queryset(folderList)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(folderList, many=True)
        return Response(serializer.data)


class UrlViewSet(viewsets.ModelViewSet):
    queryset = Url.objects.all()
    serializer_class = UrlSerializer

# @api_view(['GET']) # 해당 함수 view에서 처리할 http 메소드
# def ClipAPI(request):
#     #user = 
#     return Response("hello world!") # http response 형태로 return