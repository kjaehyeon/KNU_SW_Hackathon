from rest_framework import serializers
from .models import Url, Folder

# ModelSerializer 뒤에서 설명합니다.
class UrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Url
        fields = ('title', 'body', 'img', 'link', 'created_at', 'updated_at')

#class UrlListSerializer(serializers.ListSerializer):
class FolderSerializer(serializers.ModelSerializer):
    class MEta:
        model = Folder
        fields = ('name', 'user')