import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
        backgroundColor: '#fff',
        borderTop: '1px solid #e5e5e5',
      }}
    >
      <NavLink to="/calender">
        <span role="img" aria-label="Calendar">
          🗓️
        </span>
      </NavLink>

      <NavLink to="/lookbook">
        <span role="img" aria-label="Lookbook">
          📖
        </span>
      </NavLink>

      <NavLink to="/main">
        <span role="img" aria-label="Home">
          🏠
        </span>
      </NavLink>

      <NavLink to="/liked">
        <span role="img" aria-label="Liked">
          ❤️
        </span>
      </NavLink>

      <NavLink to="/myinfo">
        <span role="img" aria-label="My Info">
          👤
        </span>
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
