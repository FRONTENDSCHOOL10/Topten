// --------------------------------------------------------------------------
// ✅ 클라이언트 사이드 라우팅 학습
// --------------------------------------------------------------------------
// 노트 루트(route)를 추가하고 라우팅 설정해보세요.
// PocketBase 백엔드 솔루션과 연동합니다.
//
// [route] → /notes
// - 노트 리스트(목록)을 화면에 렌더링 합니다.
// - 이 페이지는 누구나 접속해 노트 목록을 확인할 수 있습니다.
// - 개별 노트 아이템(항목) 링크를 클릭하면 개별 노트 페이지로 이동합니다.
//
// [route] → /notes/new
// - 노트 작성 폼을 화면에 렌더링 합니다.
// - 이 페이지는 로그인 사용자만 접근 가능합니다.
//
// [route] → /notes/:noteId
// - 개별 노트의 상세 내용을 화면에 렌더링 합니다.
// - 이 페이지는 누구나 접속해 노트 내용을 확인할 수 있습니다.
// - 단, 노트 수정/삭제 버튼은 로그인 사용자에게만 표시되어야 합니다.
// - 노트 수정 버튼 기능 → 수정 페이지로 이동합니다.
// - 노트 삭제 버튼 기능 → 사용자에게 삭제 여부 확인 후 삭제합니다.
//
// [route] → /notes/:noteId/edit
// - 개별 노트를 수정할 수 있는 폼을 화면에 렌더링 합니다.
// - 로그인 사용자가 아닌 경우, 로그인 페이지로 이동시켜야 합니다.
// - 수정 페이지가 렌더링 되면 노트 내용이 폼에 채워져 있어야 합니다.
// - 수정 버튼 기능 → 노트 내용이 수정되어야 합니다.
//
// [route] → /register
// - 노트 작성 및 수정, 삭제 기능을 사용하려면 회원가입이 필요합니다.
// - 폼에 입력된 내용이 올바를 경우, 회원가입이 정상 처리됩니다.
//
// [route] → /login
// - 노트 작성 및 수정, 삭제 기능을 사용하려면 로그인이 필요합니다.
// - 폼에 입력된 내용이 올바르고 가입한 사용자라면 로그인이 정상 처리됩니다.
// - 로그인에 성공한 후, 바로 노트 리스트 페이지로 이동합니다.
// - 로그인 사용자는 노트 작성, 수정, 삭제가 가능합니다.
//
// --------------------------------------------------------------------------

import { createBrowserRouter } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindPasswordPage from './pages/FindPasswordPage';
import MainPage from './pages/MainPage';
import LikedPage from './pages/LikedPage';
import MyPage from './pages/MyPage';
import LookbookPage from './pages/LookbookPage';
import CalendarPage from './pages/CalendarPage';
import IntroPage from './pages/IntroPage';
import RootLayout from './layouts/RootLayout';

// import {
//   Component as NoteDetail,
//   loader as noteDetailLoader,
// } from '@/pages/Notes/NoteDetail';

/**@type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '인트로',
    path: '/',
    element: <IntroPage />,
  },
  {
    text: '로그인',
    path: '/login',
    element: <LoginPage />,
  },
  {
    text: '회원가입',
    path: '/register',
    element: <RegisterPage />,
  },
  {
    text: '비밀번호찾기',
    path: '/findpassword',
    element: <FindPasswordPage />,
  },
  {
    text: '메인페이지',
    path: '/main',
    element: <MainPage />,
  },
  {
    text: '룩북페이지',
    path: '/lookbook',
    element: <LookbookPage />,
  },
  {
    text: '달력페이지',
    path: '/calender',
    element: <CalendarPage />,
  },
  {
    text: '좋아요페이지',
    path: '/liked',
    element: <LikedPage />,
  },
  {
    text: '마이페이지',
    path: '/myinfo',
    element: <MyPage />,
  },
];

/**@type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
