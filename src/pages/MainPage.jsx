import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, CostumeCardManager } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { setLikeList } = useLikeStore(); // Zustand 상태에서 likeList 가져오기

  // sessionStorage에서 pb_auth 정보를 가져옴
  useEffect(() => {
    const pbAuth = sessionStorage.getItem('pb_auth');
    if (pbAuth) {
      try {
        const parsedUser = JSON.parse(pbAuth);
        console.log('MainPage parsedUser:', parsedUser);
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
          setCostumeCards(JSON.parse(cachedCostumeCards));
        } else {
          const records = await pb.collection('costumeCard').getFullList({
            sort: '-created',
          });
          setCostumeCards(records);
          sessionStorage.setItem('costumeCards', JSON.stringify(records));
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
      <CostumeCardManager user={user} viewType="리스트" costumeCards={costumeCards} />
      <LookBook />
    </div>
  );
}

export default MainPage;
