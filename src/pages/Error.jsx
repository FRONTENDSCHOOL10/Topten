import { Header, NavigationBar } from '@/components';
import { useRouteError } from 'react-router-dom';
import S from '@/styles/pages/Error.module.scss';

function ErrorPage() {
  const { status, statusText, data } = useRouteError();

  return (
    <>
      <Header />
      <main className="wrapComponent">
        <h1 className={S.errorTitle}>
          <q>
            {status} {statusText}
          </q>
        </h1>
        <div className={S.errorReason}>
          <p className={S.errorReason__Title}>오류 발생 요인은 다음과 같습니다.</p>
          <code className={S.errorCode}>{data}</code>
        </div>
      </main>
      <NavigationBar />
    </>
  );
}

export default ErrorPage;
