import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, CostumeCardManager } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { initLikeOrigin, initLikeLocal } = useLikeStore(); // Zustand에서 가져온 초기화 함수들

  // sessionStorage에서 pb_auth 정보를 가져옴
  useEffect(() => {
    const pbAuth = sessionStorage.getItem('pb_auth');
    if (pbAuth) {
      try {
        const parsedUser = JSON.parse(pbAuth);
        console.log('MainPage parsedUser:', parsedUser);
        setUser(parsedUser);

        // 유저가 있을 경우, like-origin을 초기화
        if (parsedUser && parsedUser.token?.id) {
          // 서버에서 like-origin 가져와 초기화
          const fetchLikeList = async () => {
            try {
              const likeListResponse = await pb.collection('likeList').getFullList({
                filter: `owner = "${parsedUser.token.id}"`,
              });
              console.log('likeListResponse in MainPage:', likeListResponse);

              // 각 항목의 costumeCard 배열을 평탄화하여 1차원 배열로 만듭니다.
              const likedIds = likeListResponse.map((item) => item.costumeCard).flat();

              initLikeOrigin(likedIds); // 중복 없이 관리
              initLikeLocal(); // like-local을 like-origin으로 복제
            } catch (error) {
              console.error('Failed to fetch likeList:', error);
            }
          };
          fetchLikeList();
        }
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
      }
    }
  }, [initLikeOrigin, initLikeLocal]);

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
