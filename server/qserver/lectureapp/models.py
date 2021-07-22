from django.db import models
from django.contrib.auth.models import User
from django.utils.functional import keep_lazy, keep_lazy_text
from django.utils.encoding import force_text
import re

class Grade(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name

class Semester(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Subject(models.Model):
    name = models.CharField(max_length=50)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default="")
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE, default="")

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subjects', blank=False)

    def __str__(self):
        return f'[{self.pk}]{self.name}'

@keep_lazy_text
def get_valid_filename(s):
    s = force_text(s).strip().replace(' ', '_')
    return re.sub(r'(?u)[^-\w.]', '', s)

def get_file_path(instance, filename):
    return '/'.join([instance.owner.username, 'lectureapp' ,instance.grade.name, instance.semester.name, instance.subject.name ,get_valid_filename(filename)])

class LectureFile(models.Model):
    name = models.CharField(max_length=100)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lecturefiles', blank=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file_data = models.FileField(upload_to=get_file_path, blank=False)
    def __str__(self):
        return f'[{self.pk}]{self.name}'

class GeneratedQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    source_file = models.ForeignKey(LectureFile, on_delete=models.CASCADE)

    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    question = models.CharField(max_length=300)
    answer = models.CharField(max_length=300)

    def __str__(self):
        return f'[{self.pk}][{self.question}]'

class WrongSubject(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'[{self.pk}]{self.name}'

class WrongQuestion(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    wrongsubject = models.ForeignKey(WrongSubject, on_delete=models.CASCADE, blank=True, null=True)

    question = models.CharField(max_length=300)
    answer = models.CharField(max_length=300)

    def __str__(self):
        return f'[{self.pk}]{self.question}'

