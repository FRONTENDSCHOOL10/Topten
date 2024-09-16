import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, CostumeCardManager, CommonModal } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';
import { Helmet } from 'react-helmet-async';

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { initLikeOrigin, initLikeLocal } = useLikeStore();
  const [isModalOpen, setModalOpen] = useState(false);

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const activateModal = () => {
    setModalOpen(true);
  };

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

  useEffect(() => {
    const pbAuth = sessionStorage.getItem('pb_auth');
    if (pbAuth) {
      try {
        const parsedUser = JSON.parse(pbAuth);
        setUser(parsedUser);

        if (parsedUser && parsedUser.token?.id) {
          const fetchLikeList = async () => {
            try {
              const likeListResponse = await pb.collection('likeList').getFullList({
                filter: `owner = "${parsedUser.token.id}"`,
              });

              const likedIds = likeListResponse.map((item) => item.costumeCard).flat();

              initLikeOrigin(likedIds);
              initLikeLocal();
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

  useEffect(() => {
    const currentTime = getCurrentFormattedTime();
    localStorage.setItem('lastAccessTime', currentTime);
  }, []);

  useEffect(() => {
    const fetchCostumeCards = async () => {
      try {
        const cachedCostumeCards = sessionStorage.getItem('costumeCards');

        if (cachedCostumeCards && JSON.parse(cachedCostumeCards).length > 0) {
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
      } finally {
        // 모든 데이터를 불러왔을 때 로딩 상태 해제
        setIsLoading(false);
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

      {/* 로딩 상태에 따른 조건부 렌더링 */}
      {isLoading ? (
        <div>Loading...</div> // 로딩 중일 때 표시할 컴포넌트 또는 스피너
      ) : (
        <div className={S.wrapComponent}>
          <button type="button" onClick={activateModal}>
            모달창 키기
          </button>
          <CommonModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            title={['로그인 후', <br />, '이용해보세요!']}
            firstActionText="회원가입인척 하는 로그인"
            firstActionLink="/login"
            secondActionText="회원가입"
            secondActionLink="/register"
          />
          <Weather />
          <Product />
          <LookBook />
        </div>
      )}
    </>
  );
}

export default MainPage;
