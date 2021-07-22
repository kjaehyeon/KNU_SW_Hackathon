from rest_framework import serializers
from .models import Url, Folder


class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ('id','title', 'folder', 'body', 'image_url', 'link', 'created_at', 'updated_at')
    

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name', 'user')