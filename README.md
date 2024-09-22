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
  - fix : 로그인 페이지
    - fix: api/validation 파일의 유효성 검사 사용으로 수정
    - fix: 불필요한 pb.authStore.clear 코드 삭제
  - fix : 유효성검사 : 패스워드 제한 글자수 수정 및 특수문자 추가 (src/api/validation.js)
  - fix : 인풋 스타일 수정 : 미세한 간격 등 수정 (src/components/Input/Input.module.scss)

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
  - feat: 현재 위치 중심으로 실시간 날씨 출력
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

  - Input 컴포넌트
    - fix: 통합 및 경로 수정
  - feature/likeList/hsw
    - 좋아요 리스트 관리 구조 재설계
      - Git의 관리를 모방하여 좋아요 리스트 관리하도록 재구성함.
    - init : likeStore.js, useLikeSync.js 재구성
    - fix : 재구성된 커스텀훅, zustand 상태에 따른 적용 변화
      - 해당 페이지 : MainPage.jsx, MyPage.jsx, CostumeCardManager.jsx, RootLayout.jsx
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

- 함정민

  - feat: 메인 페이지 날씨 컴포넌트
    - 정확한 날씨 정보 제공을 위해 초단기예보 API와 단기예보 API를 병행하는 방식으로 코드 보완
      - 초단기예보 API : 현재 기온, 체감온도, 현재 날씨 출력
      - 단기예보 API : 어제와 오늘의 기온 데이터 비교, 오늘의 최고/최저 기온 출력
    - 시간대별 날씨 출력
      - 현재 위치, 현재 시간 기준으로 24시간 데이터 출력
      - 해당 시간대의 세분화된 날씨, 기온 출력
      - 날씨에 따른 아이콘 동적으로 출력

### 9월 11일

- 권보령
  - 룩북 페이지
    - update: 착용샷 클릭 시 상세 페이지 이동
    - update: 룩북 페이지 로직 추가 및 수정
  - 룩북 상세 페이지
    - update: 룩북 상세 페이지 로직 추가
    - update: 룩북 상세 페이지 클릭된 착용샷 전달 로직 추가

### 9월 12일

- 황선우

  - fix: 야무썜 2차 피드백 기반 수정
    - manifest경로 수정
    - vite.config.js 에서 resolve 통일
    - svg파일 삭제
    - 라우터 수정
    - Test.md 삭제
    - eslint.config.js 파일 수정(야무쌤 코드 제공받음)
  - 룩북페이지, 룩북 상세페이지 라우팅

    - fix : 룩북페이지에서 룩북이미지 클릭 시 상세페이지로 이동할 수 있도록 코드 수정

  - 모달 컴포넌트
    - feat: 공통적으로 사용할 수 있는 모달컴포넌트 제작
    ```jsx
    CommonModal.propTypes = {
      isOpen: bool.isRequired, // 모달이 열렸는지 여부
      onClose: func.isRequired, // 모달을 닫는 함수
      title: string.isRequired, // 모달 제목
      firstActionText: string.isRequired, // 왼쪽 버튼 텍스트
      firstActionLink: string, // 왼쪽 버튼이 이동할 경로 (선택 사항)
      secondActionText: string.isRequired, // 오른쪽 버튼 텍스트
      secondActionLink: string, // 오른쪽 버튼이 이동할 경로 (선택 사항)
      onFirstAction: func, // 왼쪽 버튼 클릭 시 실행할 함수 (선택 사항)
      onSecondAction: func, // 오른쪽 버튼 클릭 시 실행할 함수 (선택 사항)
    };
    ```
    - style: 모달 컴포넌트 스타일링
    - fix: 컴포넌트의 index.js 경로 추가

- 권보령

  - 룩북 페이지

    - update: 룩북 페이지 로직 추가 및 수정
    - update: 룩북 디테일 페이지 클릭된 착용샷 전달 로직 추가
    - style: 룩북 상세 페이지 전체 레이아웃 구성
    - style: 룩북 상세 페이지 스타일링 상세 조정
    - update: 룩북 페이지 helmet 추가
    - stlye: 룩북 페이지 스타일링 주석 제거
    - update: 뒤로가기 시 페이지 유지 기능 추가
    - update: 랜덤 출력 로직 수정
    - update: 새로고침 기능 추가
    - update: 룩북 목록 출력 개수 제한
      - 계절 별 2벌 + 범용(4계절용) 3벌
    - style: 새로고침 버튼 스타일링
    - fix: helmet 수정

  - 룩북 상세 페이지

    - update: 뒤로가기 버튼 추가
    - helmet 추가
    - style: 스타일링 코드 추가
    - fix: 룩북 상세 페이지 네비게이션 수정

  - 룩북 컴포넌트

    - update: 룩북 상세 페이지에서의 사용을 위한 조건부 UI

  - 비밀번호 찾기 페이지
    - fix: 비밀번호 찾기 페이지 helmet 수정
    - fix: helmet 수정

### 9월 13일

- 황선우

  - feat: 좋아요 페이지 구현 및 스타일링
    - 좋아요 페이지에 필요한 포맷으로 CostumeCardManager 출력 내용 수정
    - 좋아요페이지 마크업
    - 좋아요페이지 스타일링
    - 기온, 의상카테고리 데이터 constant.js에 추가
  - CostumeCardManager
    - 앨범 스타일 변경

- 함정민
  - refactor: 날씨 정보 코드 개선
    - 초단기실황 API 추가 : 정확한 실시간 기온 및 날씨 상태 출력을 위해 초단기실황 API를 호출하도록 코드 수정
    - Zustand 상태 관리 : 날씨 정보와 위치 데이터를 전역 상태로 관리하기 위해 코드 추가
    - 로컬 스토리지 저장 : 날씨 데이터를 로컬 스토리지에 저장
      1. 현재 위치 (주소): Kakao API 활용 - 시, 구, 동 까지 표기
      2. 현재 위치와 현재 시간 기준의 TMP(기온) 데이터 저장
      3. 현재 위치와 현재 시간 기준의 날씨
      - 날씨 아이콘 : 맑음(낮), 맑음(밤) 등으로 시간을 구분하여 저장(skyCondition)
      - 날씨 텍스트 : 날씨 상태를 낮과 밤 구분 없이 저장(weatherText)
      4. 오늘부터 3일 뒤까지의 날씨
      - 3시간 간격의 예보 데이터를 모아서 일자별로 평균 값을 계산해 저장
      5. 타임스탬프 함께 저장 : 기상청 API가 업데이트 될 때를 대비
      - API 데이터를 우선적으로 사용하고, 성공 시 로컬 스토리지에 저장하여 캐싱
      - API 호출 실패 시 로컬 스토리지의 데이터를 임시로 사용
      - 데이터를 시간 제한을 두고 로컬 스토리지에 저장
      - 일정 시간이 지나면 실시간 데이터를 다시 받아오도록 처리
    - 코드 파일 분할
      1. weatherStore.js 파일 분할 및 수정
      - /src/stores/weatherStore.js : 상태 관리 및 상태 변경 함수들
      - /src/utils/weatherAPI.js : API 호출 함수들
      - /src/utils/weatherUtils.js : 유틸리티 함수들(체감 온도 계산, 그리드 변환 등)
      2. Weather.jsx 파일 분할 및 수정
      - /src/utils/weatherIcons.js : 날씨 아이콘 유틸리티 함수 분리
        /src/components/Main/Weather.jsx : 분리된 상태 관리 스토어와 연동하여 데이터를 제대로 가져올 수 있도록 수정

### 9월 14일

- 황선우

  - fix/refactoring/hsw
    - 고화질 이미지로 교체
    - 버튼 컴포넌트의 props 수정
    - 버튼 컴포넌트의 prop-types 수정
  - feat/lazywithLoader/hsw
    - 페이지에 lazy 및 suspense에 fallback으로 Loader 설정
    - CostumeCard 컴포넌트의 이미지에 Loader 설정
    - 페이지 import 정리 및 autoCancel 설정 변경

- 함정민

  - fix: 시간대별 날씨 정보 코드 오류 수정
  - feat: 메인페이지 접근시 마다 해당 시간을 로컬스토리지에 저장
  - feat: 로컬스토리지에 저장되는 날씨 데이터 객체로 묶기
  - fix: 시간대별 날씨 출력되는 시간 기준 수정
  - fix: 현재기온 출력 시간 기준(baseTime) 수정

- 권보령
  - 룩북 컴포넌트
    - update: 룩북 컴포넌트 타입 검사 추가
    - update: 현재 월과 기온에 따른 계절 판별 로직 추가
    - fix: null값 에러 처리
  - 룩북 상세 페이지
    - refactor: 룩북 상세 페이지 코드 정리
    - update: 날씨 아이콘 추가
  - constant.js
    - update: 계절 데이터 및 계절 판별 함수 추가
  - 룩북 페이지
    - refactor: 룩북 페이지 코드 리팩토링
    - fix: CostumeCard 컴포넌트의 임시 좋아요 코드 삭제
    - update: 날씨 아이콘 추가
    - update: 현재 월과 기온에 따른 계절 판별 로직 추가
    - fix: null값 에러 처리

### 9월 15일

- 황선우

  - 캘린더페이지 OOTD 컴포넌트
    - init: 캘린더 페이지 구성
    - feat: 북마크 컴포넌트 생성
    - style: CCM에 OOTD스타일 추가
    - feat: 임시용 북마크데이터 추가
    - style: 타 컴포넌트 스타일링 조정으로인한 좋아요 페이지 스타일링 수정
    - feat: 북마크 클릭 시 펼쳐지는 기능 추가
    - feat: 왼쪽 아이콘/오른쪽 아이콘 클릭 시 이전/이후 북마크로 이동하도록 추가

- 권보령
  - 달력 캘린더
    - update: react-calendar 설치
    - update: 달력 불러오기
    - update: 달력 커스텀을 위한 styled-components 설치
    - update: 달력 커스텀 조정
    - 이전 달/다음 달의 날짜 제거하기
    - 날짜에 '일' 글자 제거하기
    - 북마크 된 날짜에 스타일 추가하기
    - 북마크 된 날짜 클릭 시 Bookmark 컴포넌트 표시하기
    - update: 북마크 아이콘 추가
    - update: 제목과 달력 접기 버튼 추가

### 9월 16일

- 권보령

  - 달력 캘린더
    - update: 캘린더 페이지 머지
    - update: 캘린더 페이지 스타일 추가
    - update: 날짜 포맷 함수 생성 및 해당 함수 사용으로 수정
    - update: 달력 토글 기능
    - style: 제목 및 달력 토글 버튼 스타일링 수정
    - style: 캘린더 날짜 및 북마크 스타일링 수정
    - style: 캘린더 날짜 및 북마크 스타일링 수정
    - update: 북마크가 없는 날짜 선택 시 관련 북마크 숨김
  - 북마크 컴포넌트
    - update: 북마크 undefined 값 할당으로 인한 에러 처리

- 황선우

  - 하단 네비게이션바

    - feat: 현재 접속경로에 따른 하단 네비게이션바 색상 활성화

  - 캘린더 페이지

    - feat: calendarPage 동작 로직 구현

      - active, hover 시 테마색상 적용되도록 수정
      - 날짜 포맷 변환함수(formatDate) 에러핸들링
      - 날짜 비교함수(isSameDay) 추가
      - 북마크 좌우 이동 관련 로직 수정
        - 좌우로 북마크 이동 시, 이월된 경우 해당 월로 옮겨지도록 수정(activeStartDate)
        - 북마크를 빠르게 이동 및 빠르게 찾기 위해 배열(bookmarkList), 객체(bookmarkMap) 둘다 적용
        - goToBookmark 클릭 시에도 달력을 클릭한것 처럼 동작하도록 수정
        - 날짜관련 형식 Date객체로 통일. 표기시에만 변형
        - 위 변경사항에 따른 jsx 마크업 수정
      - 불필요한 scss 스타일 제거
      - Calendar 페이지에서 전달한 날짜정보 포맷도 Bookmark에서 동일하게 적용되도록 수정

    - fix : 캘린더페이지에서, 로컬스토리지에 북마크 관련 데이터를 저장하도록 수정
    - fix: CCM의 ootd형태일 때, 카드개수가 2개 이하일 경우의 스타일링 수정
    - fix: 저장된 북마크 기반으로 costumecard를 표기하도록 수정
    - fix: 숫자 전달 시 별표를 세팅할 수 있도록 수정

### 9월 17일

- 황선우

  - fix : 이제 @를 사용해도 vscode에서 경로를 추적할 수 있도록 변경(야무쌤 피드백)

  - feat/authZustand/hsw

    - feat: pb_auth를 zustand 상태로 관리하도록 수정
    - refactor: auth관련 zustand 상태 사용하도록 마이페이지 리팩토링
      - NavList 컴포넌트의 index 추가
      - NavList 구조 수정
        - 해당 NavList 클릭 시 동작하도록 수정
        - constant에 있던 NAV 자료구조 수정
      - zustand 상태에 맞도록 마이페이지 구조 수정
    - refactor: zustand 상태 사용하도록 헤더 수정

  - fix/projectrefactoring/hsw
    - fix: 모달 외부 클릭 시 모달을 닫도록 수정
    - fix: DB 수정에 따른 변수명 수정
      - saveTime2 에서 saveTime으로 변경
    - fix: 버튼이 틀어지는 현상 수정
      - MainPage.module.scss에 선언되어있던 button스타일링 삭제

- 함정민

  - style: 모든 페이지 전반적인 스타일 및 관련 마크업 수정

    - 공통

      - 헤더 scss
        - 헤더 배경은 가로 100%로 하되, 헤더의 콘텐츠는 가운데로 배치
        - 프로필 아이콘 사이즈 및 비율 고정되게 수정
        - src/components/Header/Header.module.scss
      - 하단 네비게이션바 jsx
        - 하단 네비게이션을 감싸는 div 생성
        - src/components/NavigationBar/NavigationBar.jsx
      - 하단 네비게이션바 scss
        - 하단 네비게이션을 감싸는 div 디자인 적용
        - 아이콘 사이즈 조정
        - src/components/NavigationBar/NavigationBar.module.scss
      - 버튼 공통 scss
        - 버튼 아이콘 왼쪽 마진값이 조정 1rem -> 0.4rem
        - src/components/Button/Button.module.scss
      - 모달 공통 scss
        - 폰트 사이즈 및 마진값 조정
        - src/components/CommonModal/CommonModal.module.scss
      - 체크박스 공통 scss
        - theme.scss, utils.scss 임포트 및 믹스인 적용
        - 체크박스 사이즈 키우기
        - 폰트 사이즈 및 두께 가독성 높이기 작업
        - src/components/RegisterCheckbox/RegisterCheckbox.module.scss
      - 셀렉트박스 공통 scss
        - 포커스 상태 스타일 추가
        - src/components/Select/Select.module.scss
      - 위로 가기 버튼 scss
        - 사이즈 수정 및 버튼 내 아이콘 위치 조정
        - src/components/ToTopButton/ToTopButton.module.scss
      - 인풋 scss
        - 폰트 사이즈 및 두께 가독성 높이기 작업
        - src/components/Input/Input.module.scss
      - 공통 utils scss
        - 콘텐츠를 중앙으로 감싸는 wrapComponent의 하단 padding 값 조정
        - 의상카드 상품명 2줄로 나오게 max-height 부여
        - src/styles/utils/\_utils.scss

    - 회원가입

      - 회원가입 jsx
        - 성별 label 및 동의 부분 div에 클래스 추가
        - src/pages/RegisterPage.jsx
      - 회원가입 scss
        - theme.scss 추가 임포트 및 믹스인 적용
        - 폰트 사이즈 및 두께 가독성 높이기 작업
        - 동의 부분 정렬 교정 및 아이콘 사이즈 수정
        - src/styles/pages/RegisterPage.module.scss

    - 로그인

      - 로그인 페이지 jsx
        - '로그인' 버튼 가운데로 정렬
        - 비밀번호보기 버튼 체크박스와 글자 마크업 수정
        - src/pages/LoginPage.jsx
      - 로그인 페이지 scss
        - '로그인' 버튼 가운데로 정렬
        - 비밀번호보기 버튼 체크박스와 글자 여백 수정
        - src/styles/pages/Login.module.scss

    - 메인

      - 메인 jsx
        - 모달창 불필요한 `<br />` 삭제 및 로그인 버튼 텍스트 수정
        - src/pages/MainPage.jsx
      - 룩북 jsx
        - '더 많은 룩북 보기' 버튼 가운데로 정렬
        - src/components/Main/LookBook.jsx
      - 룩북 scss
        - '더 많은 룩북 보기' 버튼 가운데로 정렬
        - 불필요한 margin 마이너스 값 삭제 및 조정
        - src/components/Main/LookBook.module.scss
      - product jsx
        - 모달창 불필요한 `<br />` 삭제
        - '다른 스타일 추천해드릴까요?' 버튼 가운데로 정렬
        - src/components/Main/Product.jsx
      - product scss
        - theme.scss, utils.scss 임포트 및 믹스인 적용
        - OOTD 저장 버튼 디자인 변경, 상호작용 디자인 적용
        - '다른 스타일 추천해드릴까요?' 버튼 가운데로 정렬
        - 여백 조정
        - src/components/Main/Product.module.scss
      - 북마크 모달 scss
        - 모달창 높이값 주석처리
        - src/components/BookmarkModal/BookmarkModal.module.scss

    - 코스튬카드 (hjm)

      - 코스튬카드\_hjm jsx : 원본과 변경없음. 파일만 복제함
      - 코스튬카드\_hjm scss
        - .card : flex 축약형 속성 추가, 너비 조정, 최소 높이 주석처리, css 작성 순서 변경
        - .imageWrapper : 너비, 높이 값 주석처리
        - .imageWrapper .image : 마진 탑 삭제
        - .infoWrapper : padding 추가
        - .description : 상품명 노출을 2줄로 변경
        - .link : 아이콘과 글자 세로 중앙 나열을 위한 display:flex 선언
        - .likeButton : 좋아요 버튼 크기 조정
        - src/components/CostumeCard_hjm/CostumeCard.module.scss

    - 코스튬카드 매니저

      - 코스튬카드 매니저 jsx
        - 불필요한 div.wrapComponent 삭제
        - src/components/CostumeCardManager/CostumeCardManager.jsx
      - 코스튬카드 매니저 scss
        - 의상카드를 1줄에 2개씩 나열
        - src/components/CostumeCardManager/CostumeCardManager.module.scss

    - 마이페이지

      - 마이페지이 jsx
        - 나의 체형, 나의 퍼스널컬러에 글자 두께 `<b>` 태그 적용
        - src/pages/MyPage.jsx
      - 고객센터 페이지 jsx
        - 상단 타이틀 추가
        - src/pages/CustomerServicePage.jsx
      - 고객센터 페이지 scss
        - 여백 및 글자 두께 가독성 높이기 작업
        - src/styles/pages/CustomerServicePage.module.scss
      - EditHeader scss
        - 아이콘 크기 조정, 여백 조정
        - src/components/EditHeader/EditHeader.module.scss
      - NavList scss

        - 마이페이지 하단 링크버튼들 글자 두께 조정
        - 이미지 아이콘 크기 조정
        - src/components/NavList/NavList.module.scss

      - 메인 scss : (src/styles/pages/MainPage.module.scss)
        - 🛑 마이페이지의 내용이 메인 scss에 잘못 들어간 것으로 여겨짐
        - 마이페이지의 프로필 이미지 스타일 수정
        - 마이페지이의 프로필 수정 버튼 스타일 수정
        - 불필요한 마크업 코드 삭제

    - 룩북 페이지
      - 룩북 페이지 jsx
        - 인라인 여백 조정
        - src/pages/LookbookPage.jsx
      - 룩북 디테일 scss
        - 여백 및 폰트 사이즈 및 두께 가독성 높이기 작업
        - src/styles/pages/LookbookDetailPage.module.scss
      - 룩북 페이지 scss
        - 여백 수정 및 큰 이미지 사이즈 수정
        - src/styles/pages/Lookbookpage.module.scss
    - 비밀번호 찾기

      - 비밀번호 찾기 scss
        - 폰트 사이즈 및 두께 가독성 높이기 작업
        - src/styles/pages/FindPasswordPage.module.scss

    - 좋아요 페이지
      - 좋아요 페이지 scss
        - 여백 및 비율 조정
        - 카테고리 배경컬러 부여
        - src/styles/pages/LikedPage.module.scss

  - public: 아이콘 해상도 개선 버전 업로드
    - 메인 추천OOTD 알림 아이콘
    - public/image/notification.png
  - fix: 메인페이지 접근 시간을 weatherData 객체로 묶어서 로컬스토리지에 저장
    - src/stores/weatherStore.js
  - fix: 로그인 페이지 Helmet 수정
  - fix: 룩북 디테일 페이지 jsx
    - 로컬 스토리지 날씨정보 객체에서 아이콘 가져오는 방식 수정
    - src/pages/LookBookDetailPage.jsx

### 9월 19일

- 황선우

  - fix : eslint 오류 수정 - globals 패키지 설치
  - fix/button/hsw : props 중 active 속성 분리
  - fix/lintBookmark/hsw
    - eslint 오류 수정 : p 태그의 align 속성을 스타일 클래스로 변경
  - fix/loadingMainpage/hsw
    - weatherData 로직 변경 및 메인페이지에서 실행되도록 변경
    - weatherStore, weatherAPI, weatherUtils 내의 시간 로직 수정
    - 로딩화면 최적화 위해 코드 수정
    - 발표시간 직전이면 다음날 날씨를 표기하던 에러 수정
    - loadingComment 로직 수정
  - fix/button/hsw : props 중 active 속성 분리
  - fix/lintBookmark/hsw
    - eslint 오류 수정 : p 태그의 align 속성을 스타일 클래스로 변경
  - feat : 에러페이지 생성 및 라우팅 설정
    - Error 페이지 생성
    - Fallback 페이지 스타일링 삭제
    - 인덱스 지정
    - lazy 적용된 페이지는 routes 폴더로 구분
    - Calendar페이지 scss 위치 수정
    - Error페이지 스타일링

- 곽승헌

  - fix : 로그인 여부에 따라서 모달창 표시, 불필요 주석 제거
  - fix: 불필요 모달 창, 함수 제거
  - fix: 불필요 주석 삭제
  - feat: 초기 온도 리턴 함수 추가
  - feat: 초기 온도와 일치하는 버튼이 활성화 가능하게 기능 구현, 불필요 주석 제거
  - style: 버튼 간격 수정
  - feat: 온도 조건에 맞게 추천문구 랜더링 구현
  - feat: 온도에 맞는 추천 문구 리턴 함수 생성
  - fix: pb관련 함수 묶음

### 9월 20일

- 곽승헌

  - feat : 추천 코멘트 받는 함수 생성
  - fix: weatherState 기본 값 추가
  - fix: 날씨 정보 로딩이 끝날 때까지 Product 컴포넌트 대기

- 황선우

  - fix: 좋아요페이지 레이아웃에 맞도록 앨범스타일 및 마크업 조정
  - fix : index를 위한 export 선언 조정
  - fix: export 형태 조정에 따른 import 조정
  - feat: 캘린더페이지 및 좋아요페이지 로그인 모달 삽입 및 좋아요페이지 수정
    - 좋아요페이지 로그인 모달 추가 및 로그인 확인 로직 추가
    - 날씨 필터 버튼 클릭 시 temperature 업데이트
    - 필터링 로직 수정
    - effect 훅을 통한 로그인 확인 로직 구현
    - 날씨필터버튼에 마우스휠 이동 가능하도록 수정
    - 버튼 컴포넌트 props 조정에 따른 수정
  - style: CCM의 타입에 따라 cardWrapper 스타일 구분

- 함정민
  - style: 공통, 메인 스타일 교정
    - (공통) wrapComponent 하단 여백 조정
    - (공통) 의상카드 텍스트 여백 조정
    - (메인) 날씨 영역 여백 조정
    - (메인) 날씨 시간대별 날씨 간격 조정
    - (메인) 추천OOTD 영역 여백 조정
    - (메인) 의상카드 링크 아이콘 위치 조정
    - (메인) 룩북 영역 여백 조정
    - (룩북) 룩북 페이지, 디테일 페이지 폰트 스타일 일관성 교정
    - (룩북) 디테일 페이지 여백 교정
    - (룩북) 버튼 커서 포인터 적용
    - (좋아요) 좋아요 페이지의 경우 의상카드 이미지에 imageInLikePage 클래스 추가
    - (좋아요) 좋아요 페이지의 경우 의상카드 이미지 높이 조정
    - (마이페이지) 프로필사진 수정 카메라 아이콘 위치 조정
    - (마이페이지) 프로필사진 수정 모달창 버튼 스타일 교정
    - (마이페이지) 카메라, 앨범 아이콘 해상도 높은 버전 업로드
    - (마이페이지) 폰트 사이즈 및 두께 가독성 높이기 작업

### 9월 20일

- 곽승헌
  - fix: 좋아요 버튼 클릭 시 아이템 정렬 무너짐 현상 해결
  - fix: user 정보 hook에서 zustand로 변경
  - fix: select 조건부 랜더링 추가
  - fix: user 정보 zustand로 변경 및 props 추가
  - fix: 회원가입 완료 후 인트로 페이지로 이동

### 9월 22일

- 곽승헌
  - fix: 별점 value 수정
  - fix: 북마크 별점 읽기 위해서 props와 useEffect 추가
  - feat: 북마크 별점 저장을 위한 함수 생성
  - feat: 페이지 언마운트 시 timeout 삭제를 위한 useEffect 추가
  - fix: 토스트 활성화
  - feat: 토스트 반복 나타남 현상 해결
  - fix: getInitTemperature 함수 조건 수정
