from django.contrib import admin
from .models import LectureFile, Grade, Semester, Subject

class GradeAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug' : ('name',)}
class SemesterAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug' : ('name',)}
class SubjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug' : ('name',)}

admin.site.register(LectureFile)
admin.site.register(Grade, GradeAdmin)
admin.site.register(Semester, SemesterAdmin)
admin.site.register(Subject, SubjectAdmin)
