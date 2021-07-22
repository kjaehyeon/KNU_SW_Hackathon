import pickle
import PyPDF2
from .models import GeneratedQuestion, Grade, Subject, Semester, LectureFile
from .serializers import GeneratedQuestionSerializer
from django.contrib.auth.models import User
from .models import get_valid_filename
import nltk
nltk.download('stopwords')
from Questgen import main

def MakeAndSaveQuestion(file_name, grade, subject, semester, owner):

    gradeobj = Grade.objects.get(pk=grade)
    subjectobj = Subject.objects.get(pk=subject)
    semesterobj = Semester.objects.get(pk=semester)
    fileobj = LectureFile.objects.get(grade=grade, semester=semester, subject=subject, owner__username= owner, name=get_valid_filename(file_name))
   
    file = open(fileobj.file_data.path, 'rb')
    fileReader = PyPDF2.PdfFileReader(file)

    qg= main.QGen()

    for i in range(1, fileReader.numPages):
        pageObj = fileReader.getPage(i)
        text = pageObj.extractText()
        payload = {"input_text":text}
        output = qg.predict_shortq(payload)
        try:
            for j in range(len(output['questions'])):
                question = GeneratedQuestion.objects.create(
                    grade=gradeobj, 
                    subject=subjectobj, 
                    semester=semesterobj, 
                    source_file=fileobj,
                    owner=owner,
                    question=output['questions'][j]['Question'],
                    answer=output['questions'][j]['Answer']
                    )
                question.save()
        except KeyError as e:
            pass
    
    file.close()
    return True