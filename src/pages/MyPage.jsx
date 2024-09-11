import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';
import useLikeStore from '@/stores/likeStore'; // likeList 상태를 초기화하기 위해 import

pb.authStore.clear = () => {
  console.log('pb.authStore.clear에서 실행');
  sessionStorage.removeItem('pb_auth');
  localStorage.removeItem('pb_auth');
  localStorage.removeItem('like-storage'); // like-storage만 로컬 스토리지에서 삭제
};

function MyPage(props) {
  const { resetLikeList } = useLikeStore(); // likeList 초기화 메서드

  const logout = () => {
    alert('로그아웃되었습니다.');
    pb.authStore.clear(); // 로컬 스토리지에서만 pb_auth 삭제
    resetLikeList(); // Zustand의 likeList 상태 초기화
  };

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
