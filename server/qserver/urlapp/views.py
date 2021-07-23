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
import requests
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
    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user, 
        )

    def folderlist(self, request):
        user = self.request.user
        folderList = Folder.objects.filter(user = user)
        page = self.paginate_queryset(folderList)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(folderList, many=True)
        return Response(serializer.data)



class UrlViewSet(viewsets.ModelViewSet):
    serializer_class = UrlSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def get_queryset(self):
        user = self.request.user
        if self.request.method == "GET":
            folder = self.request.GET['name']
            print(folder)
            return Url.objects.filter(user__username = user, folder__name = folder)
        return Url.objects.filter(user__username = user)
    def perform_create(self, serializer):
        print(self.request.data["link"])
        page = metadata_parser.MetadataParser(self.request.data["link"])
        title=page.get_metadatas("title", strategy=['og'])
        if title is None:
            title=page.get_metadatas("title")[0]
            body="링크를 보려면 클릭하세요."
            image_url = "https://image.flaticon.com/icons/png/512/1160/1160157.png"
        else:
            title=page.get_metadatas("title", strategy=['og'])[0]
            body=page.get_metadatas("description", strategy=['og'])
            if body is None:
                body="링크를 보려면 클릭하세요."
            else:
                body=page.get_metadatas("description", strategy=['og'])[0]
                image_url=page.get_metadatas("image", strategy=['og'])
                if image_url is None:
                    image_url = "https://lh3.googleusercontent.com/proxy/R0OM0af78z7D8R7Oms5PkTGVq96Rmm1HAtT4THD0b4wLZ5co2cIQEnXiTLwd3lgV-xKlTEvuK94gBrskRDiOOnIwfsune4X0p1Otiy6KvWQBOK3vOpzuy6KlAJSAsrY"
                else:
                    image_url=page.get_metadatas("image", strategy=['og'])[0]
        serializer.save(
            user=self.request.user, 
            title=title,
            body=body,
            image_url=image_url,
        )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


