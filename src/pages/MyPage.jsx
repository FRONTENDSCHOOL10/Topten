import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import useLikeStore from '@/stores/likeStore'; // likeList 상태를 초기화하기 위해 import
import { useLikeSync } from '@/hooks/useLikeSync'; // useLikeSync import
import { useEffect } from 'react';

pb.authStore.clear = () => {
  console.log('pb.authStore.clear에서 실행');
  sessionStorage.removeItem('pb_auth');
  localStorage.removeItem('pb_auth');
  localStorage.removeItem('like-storage'); // like-storage만 로컬 스토리지에서 삭제
};

function MyPage(props) {
  const { resetLikeList, likeList } = useLikeStore(); // likeList 초기화 및 상태 접근
  const { syncLikesToServer } = useLikeSync('LOGOUT', likeList); // useLikeSync 호출

  const logout = () => {
    alert('로그아웃되었습니다.');
    pb.authStore.clear(); // 로그아웃 시 로컬 스토리지에서 like-storage 삭제
    resetLikeList(); // Zustand의 likeList 상태를 초기화
  };

  // 로그아웃 상태에서 동기화를 방지하기 위한 처리
  useEffect(() => {
    if (pb.authStore.model === null) {
      console.log('로그아웃 상태이므로 서버 동기화를 건너뜁니다.');
    } else {
      syncLikesToServer();
    }
  }, [syncLikesToServer]);

  return (
    <>
      <div className="wrapComponent">
        마이
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
