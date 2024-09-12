import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import { useLikeSync } from '@/hooks/useLikeSync'; // useLikeSync import
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

pb.authStore.clear = () => {
  sessionStorage.removeItem('pb_auth');
  localStorage.removeItem('pb_auth');
};

function MyPage() {
  const [userId, setUserId] = useState(null); // userId 상태 추가

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const authData = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth && parsedAuth.token) {
        setUserId(parsedAuth.token.id); // userId 설정
      }
    }
  }, []);

  const { syncLikeLocalToOriginAndServer } = useLikeSync(userId); // userId 전달

  const logout = async () => {
    await syncLikeLocalToOriginAndServer(); // 로그아웃 시 서버에 like-origin 업데이트
    console.log('syncLikeL어쩌구 마이페이지에서 실행 완료');
    pb.authStore.clear(); // 로그아웃 시 스토리지에서 pb_auth 삭제
  };

  return (
    <>
      <Helmet>
        <title> 마이페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
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
      <div className="wrapComponent">
        <Link to="/">
          <button type="button" onClick={logout}>
            로그아웃
          </button>
        </Link>
      </div>
    </>
  );
}

export default MyPage;
