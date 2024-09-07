import { NavLink } from 'react-router-dom';
import getPbImageURL from '@/api/getPbImageURL';
import logo from '/image/logo.png';
import userLoginImg from '/image/user-login.png';
import S from './Header.module.scss';

const Header = () => {
  // session storage에서 pb_auth 값을 가져옵니다.
  const pbAuth = JSON.parse(sessionStorage.getItem('pb_auth'));

  // 유저의 프로필 사진 URL 생성
  const profileImageUrl = pbAuth ? getPbImageURL(pbAuth.token, 'userPhoto') : userLoginImg;

  return (
    <div className={S.wrapper}>
      <header className={S.header}>
        {/* 왼쪽에 있는 아이콘 */}
        <NavLink to="/">
          <img src={logo} alt="StyleCast 로고, 클릭시 인트로로 이동" className={S.logo} />
        </NavLink>

        {/* 오른쪽 프로필 이미지 */}
        {pbAuth ? (
          <img src={profileImageUrl} alt="User Profile" className={S.profileImage} />
        ) : (
          <NavLink to="/login">
            <img src={userLoginImg} alt="Default Profile" className={S.profileImage} />
          </NavLink>
        )}
      </header>
    </div>
  );
};

export default Header;
