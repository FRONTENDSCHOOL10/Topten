import { useState } from 'react';
import EditHeader from './../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangeColorPage.module.scss';
import Select from '../components/Select/Select';
import { COLORS } from '../data/constant';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';
import { Toaster } from 'react-hot-toast';
import useUserStore from '@/stores/userStore';
import loadToast from '@/api/loadToast';
import { Helmet } from 'react-helmet-async';

const ChangeColorPage = () => {
  const { user } = useUserStore();
  const [color, setColor] = useState(() => ['']);

  //공백 조건 처리 필
  const handleChange = (e) => {
    const { value, name } = e.target;
    setColor((prev) => [(prev = value)]);
  };

  const handleClick = async () => {
    try {
      const updatedColor = { ...user, userColor: color };
      const updatedUser = await updateUserData('users', user.id, updatedColor);
      loadToast('색상 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>나의 퍼스널컬러 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="나의 퍼스널컬러 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="나의 퍼스널컬러 | StyleCast - 나만의 스타일 캐스트" />
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
          navText="나의 퍼스널컬러"
          mainText={`${user.userNickName} 님의 퍼스널컬러`}
          description="퍼스널컬러에 맞는 옷으로 추천해드릴게요 언젠가는.."
        />
        <Select
          name="userColor"
          text="퍼스널 컬러"
          items={COLORS}
          onChange={handleChange}
          toChangeInfo={true}
          current={user.userColor}
        />
  
        <div className={S.button__container}>
          <Button text="변경하기" onClick={handleClick} />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ChangeColorPage;
