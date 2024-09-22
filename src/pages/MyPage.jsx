import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import pb from '../api/pocketbase';
import updateUserData from '../api/updateData';
// import loadToast from '../api/loadToast';

import { NAV } from '../data/constant';

import { useLikeSync } from '@/hooks/useLikeSync';

import useUserStore from '@/stores/userStore';

import clsx from 'clsx';
import S from './../styles/pages/MainPage.module.scss';

import defaultImg from '/image/happiness.png';
import { NavList, CommonModal } from '@/components';
import loadToast from '@/api/loadToast';
import toast from 'react-hot-toast';

const MyPage = () => {
  const navigate = useNavigate();
  const {
    user,
    isLoggedIn,
    initUser,
    logout: storeLogout,
    profileImageUrl,
    getUserFromDb,
  } = useUserStore();
  const { syncLikeLocalToOriginAndServer } = useLikeSync(user?.id);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(true);

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    initUser(); // zustand의 initUser 호출
    setIsLoading(false);
    toast.remove();
  }, [initUser]);

  const updateProfileImage = async (e) => {
    if (!isLoggedIn) return;
    const formData = new FormData();
    const [file] = e.target.files;
    formData.append('userPhoto', file);
    try {
      // PocketBase 컬렉션 이름을 지정하여 유저 데이터를 업데이트
      const updatedUser = await updateUserData('users', user.id, {
        ...user,
        userPhoto: formData.get('userPhoto'),
      });
      getUserFromDb({ model: 'model', token: updatedUser });
      //setUser({ ...user, userPhoto: updatedUser.userPhoto }); // 업데이트된 프로필 이미지 설정
      loadToast('프로필 이미지 설정 완료', '📌');
    } catch (error) {
      console.error('프로필 이미지 업데이트 중 오류 발생:', error);
      loadToast('프로필 이미지 업데이트 실패', '❌');
    }
  };

  const handleClickProfile = () => {
    if (!isLoggedIn) return;
    setIsActive(true);
  };

  const handleLogout = async () => {
    try {
      await syncLikeLocalToOriginAndServer(); // 로그아웃 시 서버에 like-origin 업데이트

      pb.authStore.clear(); // 로그아웃 시 스토리지에서 pb_auth 삭제

      storeLogout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때
  }

  return (
    <>
      <Helmet>
        <title> 마이페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta
          name="keywords"
          content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
      </Helmet>

      <div className={S.wrapComponent}>
        {!isLoggedIn && (
          <CommonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={['로그인 후', '이용해보세요!']}
            firstActionText="로그인"
            firstActionLink="/login"
            secondActionText="회원가입"
            secondActionLink="/register"
          />
        )}

        <div className={S.profile}>
          <div className={S.profile__info}>
            <h2>{user?.userNickName || '환영해요'}</h2>
            <p className={S.email}>{user?.email || 'E-mail'}</p>
            <p className={S.size}>
              Size: <b>{user?.userSize?.join(', ') || ''}</b>
            </p>
            <p className={S.personal__color}>
              Personal color: <b>{user?.userColor?.join(', ') || ''}</b>
            </p>
          </div>
          <div className={S.img__container}>
            <div>
              <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
            </div>
            <button className={S.camera__button} onClick={handleClickProfile}>
              <img className={S.camera__icon} src={'/icon/camera.png'} alt="프로필 이미지" />
            </button>
          </div>
        </div>

        {isLoggedIn && (
          <ul>
            {NAV.map(({ text, path, onClick, altText }, index) => (
              <NavList
                key={index}
                text={text}
                link={path}
                altText={altText}
                onClick={onClick === 'handleLogout' ? handleLogout : null} // 로그아웃에만 handleLogout 할당
              />
            ))}
          </ul>
        )}

        {/* 프로필 이미지 변경 팝업 */}
        <div className={clsx(S.profile__change__popup, { [S.active]: isActive })}>
          <div>
            <h2>사진 등록</h2>
            <button onClick={() => setIsActive(false)}>
              <img src="/icon/icon-button-close.png" />
            </button>
          </div>
          <ul>
            <li>
              <img src="/icon/camera2.png" alt="" />
              <label htmlFor="upload">카메라로 촬영하기</label>
            </li>
            <li>
              <input
                id="upload"
                type="file"
                accept="image/jpg,image/png,image/webp,image"
                className={S.upload__input}
                onChange={updateProfileImage}
              />
              <img src="/icon/picture.png" alt="" />
              <label htmlFor="upload">앨범에서 선택하기</label>
            </li>
          </ul>
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default MyPage;
