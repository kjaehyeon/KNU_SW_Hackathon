from django.contrib import admin
from .models import LectureFile, Grade, Semester, Subject

admin.site.register(LectureFile)
admin.site.register(Grade)
admin.site.register(Semester)
admin.site.register(Subject)
