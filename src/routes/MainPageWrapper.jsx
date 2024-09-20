import { Suspense, lazy } from 'react';
import Fallback from '@/pages/Fallback';

const MainPage = lazy(() => import('@/pages/MainPage'));

const MainPageWrapper = () => (
  <Suspense fallback={<Fallback />}>
    <MainPage />
  </Suspense>
);

export default MainPageWrapper;
