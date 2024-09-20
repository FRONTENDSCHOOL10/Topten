import { Suspense, lazy } from 'react';
import Fallback from '@/pages/Fallback';

const CalendarPage = lazy(() => import('@/pages/CalendarPage'));

const CalendarPageWrapper = () => (
  <Suspense fallback={<Fallback />}>
    <CalendarPage />
  </Suspense>
);

export default CalendarPageWrapper;
