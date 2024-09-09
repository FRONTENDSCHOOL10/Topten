import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import Weather from './../components/Main/Weather';
import Product from './../components/Main/Product';
import LookBook from './../components/Main/LookBook';
import CostumeCardManager from '@/components/CostumeCardManager/CostumeCardManager';
import pb from '@/api/pocketbase'; // PocketBase 인스턴스 가져오기

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);

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

  // CostumeCard 리스트를 서버에서 불러와 sessionStorage와 localStorage에 저장
  useEffect(() => {
    const fetchCostumeCards = async () => {
      try {
        const cachedCostumeCards = sessionStorage.getItem('costumeCards');

        if (cachedCostumeCards) {
          // 세션에 저장된 리스트가 있으면 그걸 사용
          setCostumeCards(JSON.parse(cachedCostumeCards));
        } else {
          // 세션에 데이터가 없으면 서버에서 불러오기
          const records = await pb.collection('costumeCard').getFullList({
            sort: '-created',
          });

          // 서버에서 받아온 리스트를 상태로 저장
          setCostumeCards(records);

          // sessionStorage에 리스트 저장
          sessionStorage.setItem('costumeCards', JSON.stringify(records));

          // localStorage에도 저장
          localStorage.setItem('costumeCards', JSON.stringify(records));
        }
      } catch (error) {
        console.error('Failed to fetch costumeCards:', error);
      }
    };

    fetchCostumeCards();
  }, []);

  return (
    <div className={S.wrapComponent}>
      <Weather />
      <Product />
      {/* costumeCards를 CostumeCardManager로 전달 */}
      <CostumeCardManager user={user} viewType="리스트" costumeCards={costumeCards} />
      <LookBook />
    </div>
  );
}

export default MainPage;
