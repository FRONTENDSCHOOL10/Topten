import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/changePage.module.scss';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';
import { Toaster } from 'react-hot-toast';
import useUserStore from '@/stores/userStore';
import loadToast from '@/api/loadToast';
import { Helmet } from 'react-helmet-async';
//잠시 커밋 확인 위한 주석
const ChangeMyInfoPage = () => {
  const { user } = useUserStore();
  const [userNickName, setUserNickName] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setUserNickName((prev) => (prev = value));
  };

  const handleClick = async () => {
    try {
      const updatedNickName = { ...user, userNickName };
      const updatedUser = await updateUserData('users', user.id, updatedNickName);
      loadToast('닉네임 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>회원정보 변경 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="회원정보 변경 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="회원정보 변경 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta name="keywords" content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
      </Helmet>
      <div className={S.wrapComponent}>
        <EditHeader
          navText="회원정보 변경"
          mainText="회원정보 변경"
          description="닉네임 등 회원정보를 변경할 수 있어요"
        />
        <Input text="닉네임" onChange={handleChange} />
        <div className={S.button__container}>
          <Button text="회원정보 변경" onClick={handleClick} />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ChangeMyInfoPage;
