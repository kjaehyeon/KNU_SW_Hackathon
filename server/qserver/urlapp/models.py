from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Folder(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Url(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    img = models.ImageField()
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title