import RootLayout from '@/layouts/RootLayout';
import {
  ChangeColorPage,
  ChangeFitPage,
  ChangeMyInfoPage,
  ChangePasswordPage,
  CustomerServicePage,
  Fallback,
  FindPasswordPage,
  IntroPage,
  LoginPage,
  MyPage,
  RegisterPage,
} from '@/pages';
import { configRoutes, getNavigationItems } from '@/utils';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Lazy-loaded components
const MainPage = lazy(() => import('./pages/MainPage'));
const LookbookPage = lazy(() => import('./pages/LookbookPage'));
const LookBookDetailPage = lazy(() => import('./pages/LookBookDetailPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const LikedPage = lazy(() => import('./pages/LikedPage'));

/**@type {import('react-router-dom').RouteObject[]} */
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
    element: (
      <Suspense fallback={<Fallback />}>
        <MainPage />
      </Suspense>
    ), // Lazy load with fallback
  },
  {
    text: '룩북페이지',
    path: '/lookbook',
    element: (
      <Suspense fallback={<Fallback />}>
        <LookbookPage />
      </Suspense>
    ), // Lazy load with fallback
    children: [
      {
        text: '룩북상세페이지',
        path: ':id',
        element: (
          <Suspense fallback={<Fallback />}>
            <LookBookDetailPage />
          </Suspense>
        ), // Lazy load with fallback
      },
    ],
  },
  {
    text: '달력페이지',
    path: '/calendar',
    element: (
      <Suspense fallback={<Fallback />}>
        <CalendarPage />
      </Suspense>
    ), // Lazy load with fallback
  },
  {
    text: '좋아요페이지',
    path: '/liked',
    element: (
      <Suspense fallback={<Fallback />}>
        <LikedPage />
      </Suspense>
    ), // Lazy load with fallback
  },
  {
    text: '마이페이지',
    path: '/myinfo',
    element: <MyPage />,
  },
  ///////
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
