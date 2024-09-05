import { createBrowserRouter } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';
import IntroPage from './pages/IntroPage';

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
    lazy: () => import('./pages/LoginPage'),
  },
  {
    text: '회원가입',
    path: '/register',
    lazy: () => import('./pages/RegisterPage'),
  },
  {
    text: '비밀번호찾기',
    path: '/findpassword',
    lazy: () => import('./pages/FindPasswordPage'),
  },
  {
    text: '메인페이지',
    path: '/main',
    lazy: () => import('./pages/MainPage'),
  },
  {
    text: '룩북페이지',
    path: '/lookbook',
    lazy: () => import('./pages/LookbookPage'),
  },
  {
    text: '달력페이지',
    path: '/calendar',
    lazy: () => import('./pages/CalendarPage'),
  },
  {
    text: '좋아요페이지',
    path: '/liked',
    lazy: () => import('./pages/LikedPage'),
  },
  {
    text: '마이페이지',
    path: '/myinfo',
    lazy: () => import('./pages/MyPage'),
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
