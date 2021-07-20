from django.db import models
from django.contrib.auth.models import User

class Grade(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Semester(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class Subject(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=100)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subjects', blank=False)

    def __str__(self):
        return self.name

class LectureFile(models.Model):
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lecturefiles', blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    file_data = models.FileField(upload_to=f'lectureapp/files/{owner}/{grade}/{semester}/{subject}/',blank=False)