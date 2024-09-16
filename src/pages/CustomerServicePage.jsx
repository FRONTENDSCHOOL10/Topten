import React from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/CustomerServicePage.module.scss';

//임시 데이터
const users = [
  { name: '곽승헌', role: '조장', email: 'test123@gmail.com', github: 'test123@gmail.com' },
  { name: '권보령', role: '정리왕', email: 'test123@gmail.com', github: 'test123@gmail.com' },
  {
    name: '함정민',
    role: '챗지피티 베프',
    email: 'test123@gmail.com',
    github: 'test123@gmail.com',
  },
  { name: '황선우', role: '스크럼마스터', email: 'test123@gmail.com', github: 'test123@gmail.com' },
];

const CustomerServicePage = () => {
  const userInfo = users.map(({ name, role, email, github }) => (
    <div className={S.user}>
      <h2 className={S.userName}>{name}</h2>
      <div className={S.userInfo}>
        <p>Role : {role}</p>
        <p>E-mail : {email}</p>
        <p>Github : {github}</p>
      </div>
    </div>
  ));

  return (
    <div className={S.wrapComponent}>
      <EditHeader
        navText="고객센터"
        mainText="고객센터"
        description="문의주시면 언제든지 답변해드리겠습니다."
      />
      <div className={S.user__container}>{userInfo}</div>
    </div>
  );
};

export default CustomerServicePage;
