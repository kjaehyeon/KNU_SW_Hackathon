from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LectureFile, Grade, Semester, Subject

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'name', 'slug', 'lecturefiles']

class SemesterSerializer(serializers.ModelSerializer):

    class Meta:
        model=Semester
        fields = ['id', 'name', 'slug']

class SubjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    grade = serializers.ReadOnlyField(source='grade')
    semester = serializers.ReadOnlyField(source='semester')

    class Meta:
        model=Subject
        fields = ['id', 'name', 'slug', 'owner', 'grade', 'semester']

class UserSerializer(serializers.ModelSerializer):
    lecturefiles =  serializers.PrimaryKeyRelatedField(many=True, queryset=LectureFile.objects.all())
    subjects = serializers.PrimaryKeyRelatedField(many=True, queryset=Subject.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'subjects', 'lecturefiles']

class LectureFileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    grade = serializers.ReadOnlyField()
    semester = serializers.ReadOnlyField()
    subject = serializers.ReadOnlyField()

    class Meta:
        model = LectureFile
        fields =['id', 'name', 'grade' ,'semester', 'subject', 'owner', 'created_at', 'updated_at', 'file_data']


