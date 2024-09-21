import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '/image/logo.png';
import S from './Header.module.scss';

import useUserStore from '@/stores/userStore';

const Header = () => {
  const { isLoggedIn, profileImageUrl, initUser } = useUserStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    profileImageUrl: state.profileImageUrl,
    initUser: state.initUser,
  }));

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 사용자 상태 초기화
    initUser();
  }, [initUser]);

  return (
    <div className={S.wrapper}>
      <header className={S.header}>
        {/* 왼쪽에 있는 아이콘 */}
        <NavLink to="/main">
          <img src={logo} alt="StyleCast 로고, 클릭 시 메인으로 이동" className={S.logo} />
        </NavLink>

        <div className={S.imageContainer}>
          {/* 오른쪽 프로필 이미지 */}
          {isLoggedIn ? (
            <NavLink to="/myinfo">
              <img src={profileImageUrl} alt="User Profile" className={S.profileImage} />
            </NavLink>
          ) : (
            <NavLink to="/login">
              <img src={profileImageUrl} alt="Default Profile" className={S.profileImage} />
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
