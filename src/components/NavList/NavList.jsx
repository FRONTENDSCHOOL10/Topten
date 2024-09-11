import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '/icon/right.svg';
import S from './NavList.module.scss';
function NavList({ text, link }) {
  const navigate = useNavigate();
  return (
    <li className={S.NavList}>
      {text}
      <span onClick={() => navigate(link)}>
        <img src={arrow} alt="페이지 이동 화살표" />
      </span>
    </li>
  );
}

export default NavList;
