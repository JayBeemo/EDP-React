# EDP ( Employee Discount Point )
ReactJS 를 통한 직원 할인 포인트 조회 웹


## 🖥️ 프로젝트 소개
자사 임직원분들의 할인 포인트 관련 정보를 직접 접속하여 조회할 수 있는 웹 프로그램 입니다. 기존의 분기별 메일로 영수 정보를 전달하던 방식에서, 직접 본인의 포인트를 조회할 수 있도록 하기 위한 웹 개발 프로젝트 입니다.
<br>

## 🕰️ 개발 기간
* 23.03.13일 - 22.05.02일

### 🧑‍🤝‍🧑 맴버구성
 - 최중백 : 전체 프로젝트 진행 ( 웹 개발 / NODE API 서버 구축 / UI,CSS 작업 )

### ⚙️ 개발 환경
- **IDE** : Visual Studio Code v1.74.2
- **Framework** : Node.js v18 / express.JS v4.18.2 / React.JS v18.2.X
- **UI Library** : Material UI
- **Database** : Oracle DB(11xe)
- **ORM** : Mybatis

## 📌 주요 기능
#### API 서버
- 별도 Repository (Private) 업데이트
#### 로그인 - 
<!-- <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login)" >상세보기 - WIKI 이동</a> -->
- 회원정보 API 연동 및 DB값 검증
- 회원 정보는 자사 ERP 프로그램의 정보(View) 데이터 참조
- 로그인 시 세션(Session) 생성
![1 접속화면](https://github.com/JayBeemo/EDP-React/assets/82929123/a3bebe70-19e2-46bf-9435-eedc293e2c10)
#### 대시보드
- API 연동을 통한 직원 할인 포인트 조회
- 분기별 적립/사용/잔여 포인트 조회 및 최근 사용 내역(10건) 조회
- 주문 정보는 자사 ERP 프로그램의 정보(View) 데이터 참조
![2 (메인)대시보드](https://github.com/JayBeemo/EDP-React/assets/82929123/0f620fd9-8fde-4abf-bc92-b5c0bc8b9662)
#### 포인트 사용내역
- API 연동을 통한 포인트 사용 내역 데이터 조회 컴포넌트
- 전체 조회 및 기간별 조회 기능 구성
- 테이블 페이징 구성
![5 전체이력 추가 컴포넌트](https://github.com/JayBeemo/EDP-React/assets/82929123/935bc28b-be2d-4c19-ad15-f4f1b454bee0)
___

2023-05-16 최초 LOGIN 화면 비디오 최적화 진행 (mp4 -> Webm)

2023-05-17 서브도메인 연결, 사내 배포 준비

2023-05-18 추가 개발사항 접수 및 진행 완료 ( 포인트 사용 내역 컴포넌트 추가)

2023-05-23 Loading Spinner 추가

2023-05-24 크롬 브라우저 상 한글 번역 시 일부 단어 오표기 문제 조치
           사용 내역 상 포인트 통화 구분자(,) 추가
