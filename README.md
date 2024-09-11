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
  - update: '더 많은 룩북 보기' 클릭 시 룩북 페이지로 이동

### 9월 8일

- 함정민

  - refactor: 로그인 페이지
    - 비밀번호보기 버튼 마크업 및 스타일 수정
    - Form.jsx, Input_kbr.jsx, Button.jsx 에 따라 코드 수정
    - 믹스인 사용

- 권보령

  - fix: 이메일 인증 버튼 위치 조정 오류 해결
  - fix: 수정된 Button 컴포넌트에 따른 Button 컴포넌트 props 수정
  - delete: 다른 버튼 컴포넌트 파일 삭제

- 황선우

  - feature/costumeCard/hsw 브랜치

    1. 의상카드 컴포넌트 및 이를 관리하는 컴포넌트(CostumeCardManager) 생성
    2. 의상카드 컴포넌트 에러핸들링
    3. 의상카드 컴포넌트 스타일링
    4. 의상카드 컴포넌트 테스트

  - fix/header/hsw 브랜치
    1. 프로필 사진이 빈 공간이 없게 채워지도록 수정

### 9월 9일

- 황선우

  - fix/Button/hsw

    1. 야무쌤의 도움으로 button에 type 속성이 빠진 것을 확인하고 수정
    2. type을 reset, submit, button 3가지로 전달할 수 있도록 수정

  - feature/costumeCard/hsw
    1. likeStore.js
       - 좋아요 리스트 전역 관리
       - likeList, toggleLike, setLikeList 제공
       - persist를 통해 새로고침 등에도 유지
    2. useLikeSync.js
       - 좋아요 리스트를 포켓베이스 서버와 동기화
       - 페이지 이동시에만 동기화 발생
    3. CostumeCardManager.jsx
       - 카드 리스트 렌더링, 페이지 이동 시 커스텀 훅(useLikeSync) 실행
       - 카드와 상태가 메모이제이션 적용되어있음.
       - 상태는 zustand로 관리됨.
    4. MainPage.jsx
       - 사용자 정보 및 CostumeCardList 불러오도록 설정 및 CCM에 전달
    5. RootLayout.jsx
       - 최상단에서 페이지 이동 감지 및 좋아요리스트 동기화 처리하도록 변경

- 권보령

  - Input 컴포넌트
    - fix: Input 컴포넌트 입력칸 범위 지정
      - 비밀번호 페이지 이메일 입력칸
    - fix: 이메일 입력칸 범위 조정을 위한 조건부 스타일 추가
  - 룩북 컴포넌트
    - update: CostumeCard 컴포넌트 추가
    - update: 착용샷 불러오기
    - style: 착장샷 크기 조정
    - feature: 착용샷 관련 상품 출력하기
    - style: 룩북 컴포넌트 레이아웃 조정

- 곽승헌

  - feature/product/ksh
    1. product 컴포넌트 생성 및 스타일링
    2. 버튼 클릭 시 기온, 카테고리에 맞는 아이템 랜더링 로직 작성
    3. 테스트를 위한 data.js 배열에 아이템 추가
    4. 새로고침 버튼 UI 생성 애니매이션은 아직 미완
    5. 새로고침 버튼 클릭 시 새로운 아이템 랜더링 로직 작성

- 함정민
  - 로그인 페이지
    - fix: api/validation 파일의 유효성 검사 사용으로 수정
    - fix: 불필요한 pb.authStore.clear 코드 삭제
  - 유효성검사 : 패스워드 제한 글자수 수정 및 특수문자 추가 (src/api/validation.js)
  - 인풋 스타일 수정 : 미세한 간격 등 수정 (src/components/Input/Input.module.scss)

### 9월 10일

- 곽승헌

  - feature/register-re/ksh

    1. Input_kbr.jsx
       - 비밀번호 표시 유무 기능 구현
       - 비밀번호 표시 유무 버튼 스타일링
    2. RegisterPage.jsx
       - 비밀번호 표시 유뮤 사용 props 추가
       - Input type 재정의
       - 회원가입 완료, 이메일 중복 결과 표시 위한 토스트 추가
       - 토스트 api 생성
    3. Product.jsx
       - 카드 아이템 랜덤 출력 로직 재구성
       - product 컴포넌트 스타일링

- 황선우

  - 위로가기 버튼컴포넌트

    - 구현 완료

  - feat: 로딩 상태표시 구현

    - Loader.jsx 구현

  - 경로 단순화를 위한 index.js 설정

  - fix: CostumeCardManager 및 연관된 로직 변경

    - CostumeCardManager.jsx : 주석 변경 및 에러 확인용 코드 추가
    - useLikeSync.js : 좋아요 리스트 동기화 로직수정, 로그아웃 시 동기화 진행하지 않음.
    - MainPage.jsx : 다른 요소 임시 비활성화. 바꾸고 커밋해야하는데 깜빡해서 이후 커밋에서 바로 바꾸겠음.
    - likeStore.js: 좋아요 리스트 초기화 메소드 추가
    - RootLayout.jsx : 동기화 트리거 및 로딩상태 추가

- 권보령

  - 룩북 컴포넌트
    - update: 착용샷 관련 상품의 id로 정보 가져오기
    - update: CostumeCardManager 컴포넌트 사용
    - style: 룩북 레이아웃 수정
    - refactor: 룩북 컴포넌트 스타일링 리팩토링
    - style: 룩북 컴포넌트 관련 상품 스와이퍼 위치 조정
  - CostumeCard 컴포넌트
    - fix: CostumeCard 컴포넌트 레이아웃 상세 수정
    - fix: 상품 이미지 크기에 따라 카드 너비가 움직이는 문제 해결
  - NavigationBar 컴포넌트
    - fix: 상품 카드가 하단 네비게이션 바를 침범하는 오류 해결

- 함정민
  - 현재 위치 중심으로 실시간 날씨 출력
    - axios 설치
    - 나의 위치 표시 (카카오API 활용 - 시 구 동 정도까지만 표기)
    - 기상청 API 연동
    - 날씨 정보에 사용될 현재 좌표값 기상청 기준에 맞게 변환 코드 작성
    - 오늘 현재시간 기온과 어제 현재시간의 기온을 비교 출력
    - 오늘의 최고, 최저 기온 표기 및 체감온도 출력
    - 기상청 날씨 데이터를 기반으로 날씨 12개로 상세 구분
    - 현재 날씨를 기반으로 아이콘 동적으로 출력
    - 세분화된 날씨 아이콘 업로드

### 9월 11일

- 황선우

  - Input 컴포넌트 통합 및 경로 수정
  - PR템플릿 수정

- 권보령
  - router 파일
    - update: 룩북 상세 페이지 경로 추가
    - fix: 룩북 상세 페이지 파일명 수정
  - Header 파일
    - update: SCSS 파일에서 헤더 위치가 움직이는 오류 해결
  - 룩북 페이지
    - update: 룩북 페이지 레이아웃 구성
    - update: 착장샷 스와이퍼 추가
    - style: 룩북 슬라이드 인라인 스타일링 파일로 이동
    - update: 룩북 스와이퍼 네비게이션 버튼 외부로 빼기 & 아이콘 추가
    - style: 룩북 스와이퍼 네비게이션 버튼 스타일링
  - 룩북 상세 페이지
    - update: 룩북 상세 페이지 초기 설정
