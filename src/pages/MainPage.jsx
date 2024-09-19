import { useEffect, useState } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, Loader, LoadingComment } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';
import { Helmet } from 'react-helmet-async';
import { useWeatherStore } from '@/stores/weatherStore';

function MainPage(props) {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { initLikeOrigin, initLikeLocal } = useLikeStore();
  const { loading: weatherLoading } = useWeatherStore(); // 추가: weatherLoading 가져오기

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // 메인 API 호출
  const mainApi = async () => {
    try {
      const pbAuth = sessionStorage.getItem('pb_auth');
      if (pbAuth) {
        const parsedUser = JSON.parse(pbAuth);
        setUser(parsedUser);

        if (parsedUser && parsedUser.token?.id) {
          const likeListResponse = await pb.collection('likeList').getFullList({
            filter: `owner = "${parsedUser.token.id}"`,
          });

          const likedIds = likeListResponse.map((item) => item.costumeCard).flat();
          initLikeOrigin(likedIds);
          initLikeLocal();
        }
      }

      // CostumeCards API 호출
      const cachedCostumeCards =
        sessionStorage.getItem('costumeCards') || localStorage.getItem('costumeCards');

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

      setLoading(false); // 모든 데이터 로딩이 끝나면 상위 컴포넌트에 로딩 해제
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // 에러가 발생해도 로딩 종료
    }
  };

  useEffect(() => {
    mainApi();
  }, []);

  const isLoading = loading || weatherLoading;

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isLoading]);

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
        {showLoader && (
          <div className={`${S.loaderOverlay} ${!isLoading ? S.fadeOut : ''}`}>
            <Loader />
            <div className={S.commentWrapper}>
              <LoadingComment text="옷차림 고민하는 중..." />
            </div>
          </div>
        )}
        <Weather />
        <Product />
        <LookBook />
      </div>
    </>
  );
}

export default MainPage;
