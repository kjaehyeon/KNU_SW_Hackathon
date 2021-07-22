from django.contrib import admin
from .models import LectureFile, Grade, Semester, Subject, GeneratedQuestion, WrongQuestion,WrongSubject

admin.site.register(LectureFile)
admin.site.register(Grade)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(GeneratedQuestion)
admin.site.register(WrongQuestion)
admin.site.register(WrongSubject)
