import { useEffect, useState, useRef } from 'react';
import S from './../styles/pages/MainPage.module.scss';
import { Weather, Product, LookBook, Loader, LoadingComment } from '@/components';
import pb from '@/api/pocketbase';
import useLikeStore from '@/stores/likeStore';
import { Helmet } from 'react-helmet-async';
import { useWeatherStore } from '@/stores/weatherStore';
import { loadingComments } from '@/data/constant';

function MainPage() {
  const [user, setUser] = useState(null);
  const [costumeCards, setCostumeCards] = useState([]);
  const { initLikeOrigin, initLikeLocal } = useLikeStore();
  const { loading: weatherLoading, initFetching, error: weatherError } = useWeatherStore();
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const intervalIdRef = useRef(null);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // 날짜 포맷 변환 함수 (한국 표준시 적용)
  const formatDate = (dateInput) => {
    const date = new Date(dateInput);

    if (isNaN(date)) {
      return '날짜 없음'; // 날짜가 올바르지 않으면 '날짜 없음' 표시
    }

    // Intl.DateTimeFormat을 사용하여 한국 표준시로 날짜 포맷팅
    const options = {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat('ko-KR', options);

    // 포맷팅된 날짜 문자열 얻기 (예: "2024.09.20")
    const formattedDate = formatter.format(date);

    return formattedDate;
  };

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
      const cachedCostumeCards = localStorage.getItem('costumeCards');

      if (cachedCostumeCards && JSON.parse(cachedCostumeCards).length > 0) {
        setCostumeCards(JSON.parse(cachedCostumeCards));
      } else {
        const records = await pb.collection('costumeCard').getFullList({
          sort: '-created',
        });
        setCostumeCards(records);
        localStorage.setItem('costumeCards', JSON.stringify(records));
      }

      const currentTime = formatDate(new Date());
      console.log(currentTime);

      localStorage.setItem('lastAccessTime', currentTime);

      getLocationAndFetchWeather();
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // 에러가 발생해도 로딩 종료
    }
  };

  const getLocationAndFetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            await initFetching(lat, lon);
            setLoading(false); // Set loading to false after all data is fetched
          } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
          }
        },
        (err) => {
          console.error('위치 가져오기 오류:', err);
          setLoading(false);
          alert('위치 정보를 받아오는 데 실패했습니다. 위치 접근 권한을 확인해주세요.');
        }
      );
    } else {
      alert('Geolocation은 이 브라우저에서 지원되지 않습니다.');
      setLoading(false);
    }
  };

  /*************************************************************************/
  // 위 함수를 일괄적으로 실행시키는 이펙트 훅

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % loadingComments.length);
    }, 8000);

    mainApi();

    return () => clearInterval(intervalIdRef.current);
  }, []);

  /**************************************************************************************************************/
  // 로딩 끝나면 상태창 없애기 위한 Flag 및 이펙트 훅

  const isLoading = loading || weatherLoading;

  useEffect(() => {
    if (!isLoading) {
      // 로딩이 완료되었을 때 interval 정리
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }

      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
      console.log('loadingComments:', loadingComments);
      console.log('currentCommentIndex:', currentCommentIndex);
      console.log('currentComment:', loadingComments[currentCommentIndex]);
    }
  }, [isLoading]);
  /**************************************************************************************************************/

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
              <LoadingComment text={loadingComments[currentCommentIndex]} />
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
