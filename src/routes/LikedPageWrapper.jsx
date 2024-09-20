import { Suspense, lazy } from 'react';
import Fallback from '@/pages/Fallback';

const LikedPage = lazy(() => import('@/pages/LikedPage'));

const LikedPageWrapper = () => (
  <Suspense fallback={<Fallback />}>
    <LikedPage />
  </Suspense>
);

export default LikedPageWrapper;
