from django.db import models
from django.contrib.auth.models import User
import os

class Grade(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100,unique=True, allow_unicode=True)
    
    def get_name(self):
        return self.name

    def __str__(self):
        return self.name

class Semester(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100,unique=True, allow_unicode=True)

    def __str__(self):
        return self.name
class Subject(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=100, unique=True, allow_unicode=True)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default=None)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, default=None)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subjects', blank=False)

    def __str__(self):
        return self.name

def content_file_name(instance, filename):
    return '/'.join([instance.owner.username, instance.grade.name, instance.semester.name, instance.subject.name ,filename])

class LectureFile(models.Model):
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lecturefiles', blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file_data = models.FileField(upload_to=content_file_name, blank=False)