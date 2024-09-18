import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '/icon/right.svg';
import S from './NavList.module.scss';
function NavList({ text, link, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // onClick 이벤트가 있을 경우 실행
    } else {
      navigate(link); // onClick이 없으면 기본 링크로 이동
    }
  };

  return (
    <li className={S.NavList} onClick={handleClick}>
      {text}
      <button>
        <img src={arrow} alt="페이지 이동 화살표" />
      </button>
    </li>
  );
}

export default NavList;
