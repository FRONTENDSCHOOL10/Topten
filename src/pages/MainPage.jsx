import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, CostumeCardManager, CommonModal } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';
import { Helmet } from 'react-helmet-async';

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { initLikeOrigin, initLikeLocal } = useLikeStore(); // Zustand에서 가져온 초기화 함수들

  // 모달창 관련 상태
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달창 활성화 하는 함수
  const activateModal = () => {
    setModalOpen(true);
  };

  // 현재 시간을 'YYYY.MM.DD HH:mm:ss' 형식으로 반환하는 함수
  const getCurrentFormattedTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };


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
                autoCancel: import.meta.env.VITE_PB_AUTO_CANCEL === 'false' ? false : undefined,
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
            autoCancel: import.meta.env.VITE_PB_AUTO_CANCEL === 'false' ? false : undefined,
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
    <>
      <Helmet>
        <title> 메인페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="메인페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="메인페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta
          name="keywords"
          content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
      </Helmet>
      <div className={S.wrapComponent}>
        <button type="button" onClick={activateModal}>
          모달창 키기
        </button>
        <br />
        <CommonModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          title={['로그인 후', <br />, '이용해보세요!']}
          firstActionText="로그인"
          firstActionLink="/login"
          secondActionText="회원가입"
          secondActionLink="/register"
        />

        <Weather />
        <Product />
        <CostumeCardManager user={user} viewType="리스트" costumeCards={costumeCards} />
        <LookBook />
      </div>
    </>
  );
}

export default MainPage;
