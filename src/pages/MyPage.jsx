import pb from '@/api/pocketbase';
import { Link } from 'react-router-dom';

pb.authStore.clear = () => {
  console.log('pb.authStore.clear에서 실행');
  sessionStorage.removeItem('pb_auth');
  localStorage.removeItem('pb_auth');
};

function MyPage(props) {
  const logout = () => {
    alert('로그아웃되었습니다.');
    pb.authStore.clear();
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
