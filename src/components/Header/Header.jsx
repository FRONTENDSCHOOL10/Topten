import { NavLink } from 'react-router-dom';
import getPbImageURL from '@/api/getPbImageURL';
import logo from '/icon/sc-favicon.png';

const Header = () => {
  // session storage에서 pb_auth 값을 가져옵니다.
  const pbAuth = JSON.parse(sessionStorage.getItem('pb_auth'));

  // 유저의 프로필 사진 URL 생성
  const profileImageUrl = pbAuth ? getPbImageURL(pbAuth.token, 'userPhoto') : '';

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      {/* 왼쪽에 있는 아이콘 */}
      <NavLink to="/main">
        <img src={logo} alt="Style Cast Logo" style={{ width: '40px' }} />
      </NavLink>

      {/* 오른쪽 프로필 이미지 */}
      {pbAuth ? (
        <img
          src={profileImageUrl}
          alt="User Profile"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
      ) : (
        <NavLink to="/login">로그인</NavLink>
      )}
    </header>
  );
};

export default Header;
