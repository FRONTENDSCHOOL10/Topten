import { NavLink } from 'react-router-dom';
import S from './NavigationBar.module.scss';

const NavigationBar = () => {
  return (
    <div className={S.navBarWrap}>
      <nav className={S.navBar}>
        <NavLink to="/calendar" className={S.navItem}>
          <img src="/image/dock-icon-calendar.png" alt="Calendar" className={S.icon} />
          <span>캘린더</span>
        </NavLink>

        <NavLink to="/lookbook" className={S.navItem}>
          <img src="/image/dock-icon-lookbook.png" alt="Lookbook" className={S.icon} />
          <span>룩북</span>
        </NavLink>

        <NavLink to="/main" className={S.navItem}>
          <img src="/image/dock-icon-home.png" alt="Home" className={S.icon} />
          <span>홈</span>
        </NavLink>

        <NavLink to="/liked" className={S.navItem}>
          <img src="/image/dock-icon-like.png" alt="Liked" className={S.icon} />
          <span>좋아요</span>
        </NavLink>

        <NavLink to="/myinfo" className={S.navItem}>
          <img src="/image/dock-icon-mypage.png" alt="My Info" className={S.icon} />
          <span>마이</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavigationBar;
