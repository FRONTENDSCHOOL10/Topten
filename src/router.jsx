// src/router.jsx
import RootLayout from '@/layouts/RootLayout';
import {
  ChangeColorPage,
  ChangeFitPage,
  ChangeMyInfoPage,
  ChangePasswordPage,
  CustomerServicePage,
  // Fallback,
  Error,
  FindPasswordPage,
  IntroPage,
  LoginPage,
  MyPage,
  RegisterPage,
} from '@/pages';
import { configRoutes, getNavigationItems } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';

// 분리된 컴포넌트 import
import MainPageWrapper from '@/routes/MainPageWrapper';
import LookbookPageWrapper from '@/routes/LookBookPageWrapper';
import LookBookDetailPageWrapper from '@/routes/LookBookDetailPageWrapper';
import CalendarPageWrapper from '@/routes/CalendarPageWrapper';
import LikedPageWrapper from '@/routes/LikedPageWrapper';

/** @type {import('react-router-dom').RouteObject[]} */
const navigation = [
  {
    text: '인트로',
    index: true,
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
    element: <MainPageWrapper />,
  },
  {
    text: '룩북페이지',
    path: '/lookbook',
    element: <LookbookPageWrapper />,
    children: [
      {
        text: '룩북상세페이지',
        path: ':id',
        element: <LookBookDetailPageWrapper />,
      },
    ],
  },
  {
    text: '달력페이지',
    path: '/calendar',
    element: <CalendarPageWrapper />,
  },
  {
    text: '좋아요페이지',
    path: '/liked',
    element: <LikedPageWrapper />,
  },
  {
    text: '마이페이지',
    path: '/myinfo',
    element: <MyPage />,
  },
  {
    text: '퍼스널컬러변경',
    path: '/changecolor',
    element: <ChangeColorPage />,
  },
  {
    text: '체형변경',
    path: '/changefit',
    element: <ChangeFitPage />,
  },
  {
    text: '정보변경',
    path: '/changeinfo',
    element: <ChangeMyInfoPage />,
  },
  {
    text: '비밀번호변경',
    path: '/changepassword',
    element: <ChangePasswordPage />,
  },
  {
    text: '고객센터',
    path: '/cs',
    element: <CustomerServicePage />,
  },
];

/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: configRoutes(navigation),
  },
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export default router;

export const navigationItems = getNavigationItems(navigation);
