import { createBrowserRouter } from 'react-router-dom';
import { configRoutes, getNavigationItems } from '@/utils';
import RootLayout from '@/layouts/RootLayout';
import IntroPage from './pages/IntroPage';
import LoginPage from './pages/LoginPage'; // Static import for now
import RegisterPage from './pages/RegisterPage'; // Static import for now
import FindPasswordPage from './pages/FindPasswordPage'; // Static import for now
import MainPage from './pages/MainPage'; // Static import for now
import LookbookPage from './pages/LookbookPage'; // Static import for now
import LookBookDetailPage from './pages/LookBookDetailPage'; // Static import for now
import CalendarPage from './pages/CalendarPage'; // Static import for now
import LikedPage from './pages/LikedPage'; // Static import for now
import MyPage from './pages/MyPage'; // Static import for now
import ChangeColorPage from './pages/ChangeColorPage';
import ChangeFitPage from './pages/ChangeFitPage';
import ChangeMyInfoPage from './pages/ChangeMyInfoPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import CustomerServicePage from './pages/CustomerServicePage';

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
    element: <LoginPage />, // Static component for now
    // lazy: () => import('./pages/LoginPage'),
  },
  {
    text: '회원가입',
    path: '/register',
    element: <RegisterPage />, // Static component for now
    // lazy: () => import('./pages/RegisterPage'),
  },
  {
    text: '비밀번호찾기',
    path: '/findpassword',
    element: <FindPasswordPage />, // Static component for now
    // lazy: () => import('./pages/FindPasswordPage'),
  },
  {
    text: '메인페이지',
    path: '/main',
    element: <MainPage />, // Static component for now
    // lazy: () => import('./pages/MainPage'),
  },
  {
    text: '룩북페이지',
    path: '/lookbook',
    element: <LookbookPage />, // Static component for now
    // lazy: () => import('./pages/LookbookPage'),
    children: [
      {
        text: '룩북상세페이지',
        path: ':id',
        element: <LookBookDetailPage />, // Static component for now
        // lazy: () => import('./pages/LookbookPage'),
      },
    ],
  },
  {
    text: '달력페이지',
    path: '/calendar',
    element: <CalendarPage />, // Static component for now
    // lazy: () => import('./pages/CalendarPage'),
  },
  {
    text: '좋아요페이지',
    path: '/liked',
    element: <LikedPage />, // Static component for now
    // lazy: () => import('./pages/LikedPage'),
  },
  {
    text: '마이페이지',
    path: '/myinfo',
    element: <MyPage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
  },
  ///////
  {
    text: '퍼스널컬러변경',
    path: '/changecolor',
    element: <ChangeColorPage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
  },
  {
    text: '체형변경',
    path: '/changefit',
    element: <ChangeFitPage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
  },
  {
    text: '정보변경',
    path: '/changeinfo',
    element: <ChangeMyInfoPage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
  },
  {
    text: '비밀번호변경',
    path: '/changepassword',
    element: <ChangePasswordPage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
  },
  {
    text: '고객센터',
    path: '/cs',
    element: <CustomerServicePage />, // Static component for now
    // lazy: () => import('./pages/MyPage'),
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
