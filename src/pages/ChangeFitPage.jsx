import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangeFitPage.module.scss';
import { SIZE } from '../data/constant';
import Select from '../components/Select/Select';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';

import { Toaster } from 'react-hot-toast';
import loadToast from '@/api/loadToast';
import useUserStore from '@/stores/userStore';
import { Helmet } from 'react-helmet-async';

const ChangeFitPage = () => {
  const { user } = useUserStore();
  const [userSize, setUserSize] = useState({
    topSize: user.userSize[0],
    bottomSize: user.userSize[1],
  });

  //공백 조건 처리 필
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserSize((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const updatedSize = {
        ...user,
        userSize: [userSize.topSize, userSize.bottomSize],
      };
      console.log('updatedSize', updatedSize);
      const updatedUser = await updateUserData('users', user.id, updatedSize);
      loadToast('사이즈 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };
  console.log('user', user);

  return (
    <>
      <Helmet>
        <title>나의 체형 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="나의 체형 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="나의 체형 | StyleCast - 나만의 스타일 캐스트" />
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
          navText="나의 체형"
          mainText={`${user.userNickName} 님의 체형`}
          description="제형에 맞는 옷으로 추천해드릴게요 언젠가는.."
        />
  
        <div className={S.select__container}>
          <Select
            name="topSize"
            text="상의 사이즈"
            items={SIZE}
            onChange={handleChange}
            toChangeInfo={true}
            current={user.userSize[0]}
          />
        </div>
        <div className={S.select__container}>
          <Select
            name="bottomSize"
            text="하의 사이즈"
            items={SIZE}
            onChange={handleChange}
            toChangeInfo={true}
            current={user.userSize[1]}
          />
        </div>
  
        <div className={S.button__container}>
          <Button text="변경하기" onClick={handleClick} />
        </div>
  
        <Toaster />
      </div>
    </>
  );
};

export default ChangeFitPage;
