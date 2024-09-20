import { Suspense, lazy } from 'react';
import Fallback from '@/pages/Fallback';

const LookBookDetailPage = lazy(() => import('@/pages/LookBookDetailPage'));

const LookBookDetailPageWrapper = () => (
  <Suspense fallback={<Fallback />}>
    <LookBookDetailPage />
  </Suspense>
);

export default LookBookDetailPageWrapper;
