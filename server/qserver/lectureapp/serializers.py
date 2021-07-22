from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LectureFile, Grade, Semester, Subject, GeneratedQuestion, WrongQuestion

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ['id', 'name', 'lecturefiles']

class SemesterSerializer(serializers.ModelSerializer):

    class Meta:
        model=Semester
        fields = ['id', 'name']

class SubjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model=Subject
        fields = ['id', 'name', 'owner', 'grade', 'semester']

class UserSerializer(serializers.ModelSerializer):
    lecturefiles = serializers.PrimaryKeyRelatedField(many=True, queryset=LectureFile.objects.all())
    subjects = serializers.PrimaryKeyRelatedField(many=True, queryset=Subject.objects.all())
    questions = serializers.PrimaryKeyRelatedField(many=True, queryset=GeneratedQuestion.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'subjects', 'lecturefiles', 'questions']

class LectureFileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = LectureFile
        fields =['id', 'name', 'grade' ,'semester', 'subject', 'owner','created_at', 'updated_at', 'file_data']


class GeneratedQuestionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = GeneratedQuestion
        fields = ['id', 'subject','grade', 'semester', 'source_file', 'owner', 'question', 'answer']

class WrongQuestionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = WrongQuestion
        fields = ['id', 'subject', 'owner', 'question', 'answer']
