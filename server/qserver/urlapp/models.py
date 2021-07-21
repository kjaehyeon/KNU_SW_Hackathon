from django.db import models
from django.contrib.auth.models import User
import metadata_parser
from urllib.parse import urlparse

from django.core.files import File

from .file import download, get_buffer_ext # 위에서 만든 file.py 경로

# Create your models here.
class Folder(models.Model):
    user = models.ForeignKey(User, related_name='folders', on_delete=models.CASCADE, blank=False)
    name = models.CharField(max_length=200)
    def __str__(self):
        return f'[{self.pk}]{self.name}'

def get_file_path(instance, filename):
    return '/'.join([instance.user.username, "URLAPP", instance.folder.name, instance.title, filename])

class Url(models.Model):
    link = models.URLField()
    page = metadata_parser.MetadataParser(url=link.name)
    title = models.CharField(max_length=200, null=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, blank=False)
    user = models.ForeignKey(User, related_name='urls', blank=False, on_delete=models.CASCADE)
    body = models.TextField(null=True)
    image_url = models.URLField(null=True)
    #img = models.ImageField(upload_to=get_file_path, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    """
    def save(self, *args, **kwargs):
        # ImageField에 파일이 없고, url이 존재하는 경우에만 실행
        if self.link and not self.img:
            # 우선 purchase_url의 대표 이미지를 크롤링하는 로직은 생략하고, 크롤링 결과 이미지 url을 임의대로 설정  
            page = metadata_parser.MetadataParser(self.link)
            item_image_url = page.get_metadatas("image", strategy=['og'])[0]

            if item_image_url:
                temp_file = download(item_image_url)
                file_name = '{urlparse}.{ext}'.format(
                    # url의 마지막 '/' 내용 중 확장자 제거
                    # ex) url = 'https://~~~~~~/bag-1623898_960_720.jpg'
                    #     -> 'bag-1623898_960_720.jpg'
                    #     -> 'bag-1623898_960_720'
                    urlparse=urlparse(item_image_url).path.split('/')[-1].split('.')[0],
                    ext=get_buffer_ext(temp_file)
                )
                self.img().save(file_name, File(temp_file))
                super().save()
            else:
                super().save()
    """
    def __str__(self):
        return f'[{self.pk}]{self.title}'