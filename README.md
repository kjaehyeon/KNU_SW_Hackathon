# 2021 KNU-HACKERTHON

---

![logo](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ad267fd9-e53d-49e8-893d-9b8fdd02b499/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210722%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210722T203055Z&X-Amz-Expires=86400&X-Amz-Signature=a892073330e564e4b887b455ebb59166a4599935bc6a09b3fad32b78d509cbed&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.jpeg%22)

## 1. 주제



- **서비스 한 줄 요약 : 대학생을 위한 Personal Library & QUIZ MAKEING 서비스**
- **Slogan : Ask yourself!**
- 문제점 및 개발배경
    1. 코로나로 인한 비대면 강의로 학습의 떨어지는 학습의 효율성을 보조하기 위한 Tool의 필요성이 큽니다.
    2. 학생들은 학습을 위해 직접 문제를 만드는 데 많은 시간을 투자해야 합니다.
    3. 학생들이 전공 및 기타 공부관련해 필요한 정보를 스크랩 해두는 URL 정리를 위한 툴이 부족합니다.
    4. 학년/학기별 강의자료를 저장하고 정리하기 위한 도구가 필요합니다.
- 해결책
    - AI가 **자동으로 퀴즈**를 만들어주는 서비스
    - 대학생들의 **강의자료와 각종 URL을 한 번에 보기 쉽게 정리** 하기 위한 서비스

## 2. Team Name : Queen's Gambit & 팀원



- **프론트엔드 (React)**
    - 강준구 (경북대학교 컴퓨터학부)

        Github : [https://github.com/Jungu12](https://github.com/Jungu12)

        학번 : 2017114660

    - 나현준 (경북대학교 컴퓨터학부)

        Github : [https://github.com/nhj2927](https://github.com/nhj2927)

        학번 : 2017114482

![react_image](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/86a672de-ce28-4407-921a-5c26e2ed905f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210722%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210722T203122Z&X-Amz-Expires=86400&X-Amz-Signature=b553e4c7cdf0a62b1a32373be2c902c34dfdea057384e36761ee3db1cdd6d2b3&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

- **백엔드 (Django Rest Framework)**
    - 김재현 (경북대학교 컴퓨터학부)

        Github : [https://github.com/kjaehyeon](https://github.com/kjaehyeon)

        학번 : 2017113301

    - 김태원 (경북대학교 컴퓨터학부)

        Github : [https://github.com/Ktaewon](https://github.com/Ktaewon)

        학번 : 2017112351

![drf_image](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/31fe5281-ffa7-4c38-9d4d-0452743f9f0d/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210722%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210722T203153Z&X-Amz-Expires=86400&X-Amz-Signature=3394cb689b352ad171d39fe1d78aa87914b700f27a881918f6c6c5187207654f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

## 3. 서비스 Description



### **Service Name : Query**

![home_image](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/435948c2-767b-44fa-b35a-d43a8cc5f012/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210722%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210722T203239Z&X-Amz-Expires=86400&X-Amz-Signature=ec235e52e9dedfdcf98732aa8cc2a8f4f994448217ba7a4af83b0ce4b9710c69&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### **핵심 기능**

- **강의자료 저장 및 관리**
    - 사용자가 업로드한 강의자료를 저장하고 관리하는 기능입니다.
    - 학년/학기/과목 별로 구별되어 있어 자료를 효율적으로 관리할 수 있습니다.
- **퀴즈 생성 & 퀴즈 풀기**
    - 라이브러리
        - Qestgen.ai : https://github.com/ramsrigouthamg/Questgen.ai
        - PyPDF2 : https://github.com/mstamy2/PyPDF2
    - 주요기능
        - PDF파일형식의 강의자료가 업로드 되면 자동으로 텍스트를 추출하고 Questgen.ai 모듈에 전달하여 퀴즈를 추출 & 생성하여 저장 후, 사용자의 요청이있을 시 전달합니다.
        - Questgen.ai 모듈은 T5, BERT, GPT-2와 같은 transformer들을 이용하여 학습에 적합한 퀴즈들을 생성하여 효율적인 학습을 가능하게 하는 오픈소스 NLP 라이브러리 입니다.
    ```bash
    **used lib**
    PyPdf2
    Questgen AI
    ```

- **오답노트**
    - 퀴즈를 풀고 틀린 문제가 있다면 자동으로 오답노트에 기록되어 언제든 다시 풀어볼 수 있습니다.
    - 오답노트를 잘 활용하고 분석한다면 본인의 약점을 충분히 보완할 수 있습니다.
 
- **URL 저장 및 관리**
    - 좌측 Link Keeper 클릭 시 생성 된 폴더를 볼 수 있습니다
    - Link Keeper 우측 폴더 생성 아이콘을 누르면 폴더를 추가 생성할 수 있습니다.
        - 사용자가 POST한 폴더이름을 서버에서 저장합니다.
    - 생성된 폴더 옆 LINK 생성 아이콘을 클릭하면 새로운 LINK를 생성할 수 있습니다.
        - 사용자가 POST한 URL을 서버에서 미리보기를 자동 생성하여 저장합니다.
    - 폴더 클릭 시 해당 폴더 내의 LINK 목록을 카드 형태로 보여줍니다.
        - 저장된 미리보기를 서버에서 받아옵니다.
    - 폴더로 각 URL들을 관리할 수 있습니다.
        - 각 LINK를 휴지통 아이콘 클릭시 DELETE 메소드를 통해 삭제할 수 있습니다.
        - 링크 아이콘 클릭 시 해당 링크로 바로 연결됩니다.

        ```bash
        **used lib**
        metadata_parser
        ```

### 기본 기능

- 인증
    - 방식 : 토큰 형식
    - knox 사용하여 토큰을 인증하는 방식으로 매 API 요청시 인증하여 작업하게 됩니다.
- 회원가입
    - 회원가입 시 서버에서 USER DB 저장
    - 비밀번호는 암호화되어 관리자도 접근 불가
- 로그인 & 로그아웃
    - 로그인 시 서버에서 token 정보 반환하여 클라이언트가 해당 token을 이용해 추후 서비스 지속적으로 이용가능
    - 로그아웃시 token 소멸
- 업로드 & 삭제 & 수정
    - 로그인시에만 업로드&삭제&수정이 가능합니다
    - 로그인 만료 시에는 작업이 불가능합니다.


## Tech Stack



- Django 3.2.5 version
- Django Rest Framework 3.12.4 version
- React 17.0.2 version

## 향후 계획(Development)



### 1. 질문 공유 기능

### 2. 강의자료 공유 기능

## Get started



### I**nstallation & Run**

1. Clone the repository & change directory

    ```bash
    $ git clone [https://github.com/qkrwoghk15/KNU_SW_hackathon.git](https://github.com/kjaehyeon/KNU_SW_Hackathon.git)
    ```

2. 
    - server

    ```bash
    $ cd server
    $ python -m venv myvenv
    $ source myvenv/Script/Activate (Windows) / source myvenv/bin/Activate (Mac)
    $ pip install -r requirements.txt
    $ cd qserver
    $ python manage.py makemigrations
    $ python manage.py migrate
    $ python manage.py runserver
    ```

    - client

    ```bash
    $ cd client
    ```
##[API 명세서](https://www.notion.so/API-08fe6e9aa2714e8085eb016c09e0db73)
