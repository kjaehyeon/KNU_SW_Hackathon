# 2021 KNU-HACKERTHON

---

![2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled.jpeg](2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled.jpeg)

## 1. 주제

---

- **서비스 한 줄 요약 : 대학생을 위한 Personal Library & AUTO QUIZ MAKE 서비스**
- **Slogan : Ask yourself!**
- 문제점 및 개발배경
    1. 대학생 전공, 교양 등 공부를 위해 직접 문제를 만들기에 시간투자가 너무 많이 필요하다
    2. 대학생들이 전공 및 기타 공부관련 URL 정리를 위한 툴이 부족하다
    3. 각 학기별 강의자료 정리를 용이하게 하기 어렵다
- 해결책
    - 대학생들의 강의자료를 **자동으로 퀴즈**로 만들어주는 서비스
    - 대학생들의 **강의자료 정리**와 **각종 URL을 한 번에 정리** 하기 위한 서비스

## 2. Team Name : Queen's Gambit & 팀원

---

- **클라이언트 (React)**
    - 강준구 (경북대학교 컴퓨터학부)

        Github : [https://github.com/Jungu12](https://github.com/Jungu12)

        학번 : 2017114660

    - 나현준 (경북대학교 컴퓨터학부)

        Github : [https://github.com/nhj2927](https://github.com/nhj2927)

        학번 : 2017114482

![2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled.png](2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled.png)

- **서버 (Django Rest Framework)**
    - 김재현 (경북대학교 컴퓨터학부)

        Github : [https://github.com/kjaehyeon](https://github.com/kjaehyeon)

        학번 : 2017113301

    - 김태원 (경북대학교 컴퓨터학부)

        Github : [https://github.com/Ktaewon](https://github.com/Ktaewon)

        학번 : 2017112351

![2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled%201.png](2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled%201.png)

## 3. 서비스 Description

---

### **Service Name : Query**

![2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled%202.png](2021%20KNU-HACKERTHON%203c458a406b724c0ba758f977d780261e/Untitled%202.png)

### **주요 기능**

- **강의자료 저장 및 관리**
    - 사용자가 업로드한 강의자료를 저장하고 관리하는 기능입니다.
    - 학년/학기/과목 별로 구별되어 있어 대학생에게 최적화되어 있습니다.
- **퀴즈 생성 & 퀴즈 풀기**

    ```bash
    **used lib**
    PyPdf2
    Questgen AI
    ```

- **오답노트**
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

### Service Description

- 

## Tech Stack

---

- Django 3.2.5 version
- Django Rest Framework 3.12.4 version
- React 17.0.2 version

## 향후 계획(Development)

---

### 1. 질문 공유 기능

### 2. 강의자료 공유 기능

## Get started

---

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

[API 명세서](https://www.notion.so/API-08fe6e9aa2714e8085eb016c09e0db73)
