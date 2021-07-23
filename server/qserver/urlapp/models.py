from django.db import models
from django.contrib.auth.models import User
import metadata_parser
from urllib.parse import urlparse

from django.core.files import File

# Create your models here.
class Folder(models.Model):
    user = models.ForeignKey(User, related_name='folders', on_delete=models.CASCADE, blank=False, null=True)
    name = models.CharField(max_length=200)
    def __str__(self):
        return f'[{self.pk}]{self.name}'

class Url(models.Model):
    link = models.URLField()
    page = metadata_parser.MetadataParser(url=link.name)
    title = models.CharField(blank=True, max_length=200, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, blank=False)
    user = models.ForeignKey(User, related_name='urls', blank=False, on_delete=models.CASCADE)
    body = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    #img = models.ImageField(upload_to=get_file_path, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'[{self.pk}]{self.title}'