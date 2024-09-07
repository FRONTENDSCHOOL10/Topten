# Topten - Final Project for LikeLion FES

## 변경 로그

### 08/26

- 황선우
  - init : 초기환경 구성

### 09/03

- 곽승헌

  - config : 라우터 설정

- 권보령
  - update: 입력칸 입력 받아오기
  - update: 이메일 인증 버튼 클릭 시 로직 구성
  - update: 이메일 인증 버튼 조건부 UI
  - create: 페이지 제목 설정 유틸리티 함수 추가
  - update: Form 컴포넌트 생성 및 로직 구상
  - update: 이름, 이메일 유효성 검사 및 경고 문구 띄우기

### 9월 4일

- 권보령

  - create: 인풋 공통 컴포넌트 생성
  - style: 경고 문구 스타일링
  - update: 포켓 베이스 연동
  - update: 조건부 UI 구성
  - style: 버튼 컴포넌트 스타일링 수정 및 추가
    - 활성화 시 색상 변경
  - create: 리액트 핫 토스트 설치
  - update: 이메일 전송 성공 시 토스트 띄우기

- 함정민
  - feat : 로그인 페이지 레이아웃 및 기능 구현
  - feat : 파비콘 디자인 작업 및 연동

### 9월 5일

- 권보령

  - create: 버튼 컴포넌트 개인으로 생성
  - update: 비밀번호 찾기 페이지
    - 로그인 하러 가기 버튼 추가
    - 토스트 추가 및 스타일링
  - fix: 버튼에 마우스 오버 시 UI 축 변경되는 에러 해결
  - update: 비밀번호 찾기 페이지
    - 클래스명 변경 및 추가
  - update: 비밀번호 찾기 페이지
    - '로그인 하러 가기' 버튼 로직 구현
  - update: 비밀번호 찾기 페이지
    - SEO 메타 태그를 위한 react-helmet-async 설정
  - refactor: Input 컴포넌트
    - props로 받아서 사용하는 것으로 리팩토링
  - style: 비밀번호 찾기 페이지
    - 페이지 클릭 시 커서 깜빡임 현상 제거를 위한 코드 추가

- 황선우

  - develop 브랜치:

    1.  vitest 중복 부분 정리
    2.  server.mjs 삭제
    3.  index.html 태그 정리
    4.  manifest.webmanifest 생성
    5.  gitignore에 .env, pocketbase 제외하도록 설정
    6.  router.jsx 코드 스플리팅
    7.  \_theme.scss 에서 css 커스텀 속성 활용
    8.  공통 컴포넌트 (Button, Input, Select 피드백 요소 반영)

  - navbar 브랜치:

    1. 하단네비게이션 바 구성 완료
    2. 임시로 모든 페이지에서 하단네비게이션 바가 동작하도록 RootLayout 설정
    3. 스타일링 적용

  - introPage 브랜치:
    1. introPage 구성 완료
    2. 커스텀 버튼 컴포넌트 구성 완료

- 함정민

  - feat : 로그인 페이지 비밀번호보기 기능 추가 및 스타일링
  - feat : 로그인 페이지 - 로그인 성공시 로컬 스토리지에도 유저 정보 저장 구현
  - feat : 로그인 페이지 - 비밀번호찾기 및 회원가입 버튼 클릭시 페이지 "이동" → "전환"
  - feat : 로그인 페이지 - 상단에 헬멧 활용하여 메타태그 적용
  - feat : 로그인 페이지 - 로그인상태에서 재접근시 메인페이지로 전환 기능 추가
  - fix : 인풋 경고문구에 클래스 추가 (Input.jsx)
  - fix : div 전체에 적용되던 스타일링 해제 (FindPasswordPage.module.scss)

- 곽승헌
  - create: 체크박스 컴포넌트 생성
  - create: 셀렉트 컴포넌트 생성
  - create: 회원가입 기능 추가
  - create: pb통신 함수 생성
  - create: 회원가입 기능 추가
  - fix: 버튼 컴포넌트 속성 추가

### 9월 6일

- 권보령

  - fix: 비밀번호 찾기 페이지의 필요없는 코드 제거
  - fix: '이메일 인증' 버튼 조건부 UI로 수정
  - refactor: 수정된 Button 컴포넌트 기준으로 리팩토링
  - update: Input 컴포넌트 타입 검사 추가

- 함정민
  - style : 모든 페이지의 콘텐츠를 가운데 래핑 적용하는 공통 스타일(wrapComponent) 지정

### 9월 7일

- 황선우

  - develop 브랜치:

    1. eslint 관련 설정 수정
    2. 더미파일 제거(.gitkeep)
    3. \_theme.scss 부분 수정
    4. 버튼컴포넌트 통합
    5. 버튼컴포넌트 통합으로 인한 경로 수정

  - fix/Header/hsw 브랜치:
    1. 헤더가 상단에 고정되지 않는 현상 수정

- 권보령
  - refactor: 비밀번호 페이지
    - 레이아웃 및 스타일 수정
    - 믹스인 제작 및 사용
    - 공통 디자인인 wrapComponent로 컨테이너 수정
  - update: 폰트 믹스인 추가
  - fix: --gray-600 색상 코드 변경
    - 실제 피그마에 사용하는 색상이 없어서 기존 --gray-600 코드 색상 변경
  - update: 이메일 인증 버튼 위치 조정
    - 입력칸 위로 조정
  - refactor: Input 컴포넌트 CSS 리팩토링
  - fix: 로그인 하러 가기 버튼 위치 조정
  - fix: Input 컴포넌트
     - React import 제거
  - create: 메인 페이지
    - 컴포넌트 생성(날씨(Weather), 상품 목록(Product), 룩북(LookBook))
  - 메인 페이지 scss 파일 생성
  - update: 룩북 컴포넌트
    - 레이아웃 제작
    - 버튼 컴포넌트 생성