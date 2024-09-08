import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import Weather from './../components/Main/Weather';
import Product from './../components/Main/Product';
import LookBook from './../components/Main/LookBook';
import CostumeCardManager from '@/components/CostumeCardManager/CostumeCardManager';

function MainPage(props) {
  const [user, setUser] = useState(null);

  // sessionStorage에서 pb_auth 정보를 가져옴
  useEffect(() => {
    const pbAuth = sessionStorage.getItem('pb_auth');
    if (pbAuth) {
      try {
        const parsedUser = JSON.parse(pbAuth);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, []);

  // user 정보가 로드되지 않았으면 로딩 상태 표시
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={S.wrapComponent}>
      {/* user 정보와 viewType을 전달하여 CostumeCardManager를 렌더링 */}
      <CostumeCardManager user={user} viewType="앨범" />
      <Weather />
      <Product />
      <LookBook />
    </div>
  );
}

export default MainPage;
