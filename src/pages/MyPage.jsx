import { useLikeSync } from '@/hooks/useLikeSync.js';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import pb from '../api/pocketbase';
import NavList from '../components/NavList/NavList';
import { NAV } from '../data/constant';
import useGetUserInfo from '../hooks/useGetUserInfo';
import getPbImageURL from './../api/getPbImageURL';
import S from './../styles/pages/MainPage.module.scss';
import defaultImg from '/image/happiness.png';
import clsx from 'clsx';
import updateUserData from '../api/updateData';
import { Toaster } from 'react-hot-toast';
import loadToast from '../api/loadToast';
function MyPage(props) {
  const navigate = useNavigate();
  const { user, setUser } = useGetUserInfo();
  const [isActive, setIsActive] = useState(false);
  const profileImageUrl = user.userPhoto ? getPbImageURL(user, 'userPhoto') : defaultImg;
  const { userNickName, email, userSize: size, userColor } = user;

  const updateProfileImage = async (e) => {
    const formData = new FormData();
    const [file] = e.target.files;
    formData.append('userPhoto', file);
    const { userPhoto } = await updateUserData(user.id, {
      ...user,
      userPhoto: formData.get('userPhoto'),
    });
    setUser({ ...user, userPhoto });
    loadToast('프로필 이미지 설정 완료', '📌');
  };

  //임시 모달
  const modal = !user.isUser && (
    <div className={S.modal__outer}>
      <div className={S.modal}>
        <h1>로그인 ㄴㄴ 임시 모달</h1>
        <button onClick={() => navigate('/login')}>로그인 버튼</button>
      </div>
    </div>
  );
  //////////////로딩 구현

  /***************************************************** */
  // 로그아웃 구현 위한 부분
  const [userId, setUserId] = useState(null); // userId 상태 추가

  // 로그인된 사용자 정보 가져오기
  useEffect(() => {
    const authData = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth && parsedAuth.token) {
        setUserId(parsedAuth.token.id); // userId 설정
      }
    }
  }, []);

  const { syncLikeLocalToOriginAndServer } = useLikeSync(userId); // userId 전달

  const logout = async () => {
    await syncLikeLocalToOriginAndServer(); // 로그아웃 시 서버에 like-origin 업데이트
    console.log('syncLikeL어쩌구 마이페이지에서 실행 완료');
    pb.authStore.clear(); // 로그아웃 시 스토리지에서 pb_auth 삭제
    // sessionStorage와 localStorage에서 pb_auth 삭제
    sessionStorage.removeItem('pb_auth');
    localStorage.removeItem('pb_auth');
  };

  /***************************************************** */

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
        {modal}
        <div className={S.profile}>
          <div className={S.profile__info}>
            <h2>{user.isUser ? userNickName : '환영해요'}</h2>
            <p className={S.email}>{user.isUser ? email : 'E-mail'}</p>
            <p className={S.size}>Size: {user.isUser ? size : ''}</p>
            <p className={S.personal__color}>Personal color {user.isUser ? userColor : ''}</p>
          </div>
          <div className={S.img__container}>
            <div>
              <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
            </div>
            <button className={S.camera__button} onClick={() => setIsActive(true)}>
              <img className={S.camera__icon} src={'/icon/camera.png'} alt="프로필 이미지" />
            </button>
          </div>
        </div>
        <ul>
          {user.isUser
            ? NAV.map(({ text, path }, index) => <NavList key={index} text={text} link={path} />)
            : ''}
        </ul>
        <div className="logoutButton">
          <Link to="/">
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          </Link>
        </div>
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
}

export default MyPage;

// import { useLikeSync } from '@/hooks/useLikeSync.js';
// import { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Link, useNavigate } from 'react-router-dom';
// import pb from '../api/pocketbase';
// import NavList from '../components/NavList/NavList';
// import { NAV } from '../data/constant';
// import useGetUserInfo from '../hooks/useGetUserInfo';
// import getPbImageURL from './../api/getPbImageURL';
// import S from './../styles/pages/MainPage.module.scss';
// import defaultImg from '/image/happiness.png';
// // import { useNavigate } from 'react-router-dom';
// import clsx from 'clsx';
// // import { useState } from 'react';
// import updateUserData from '../api/updateData';

// function MyPage(props) {
//   const navigate = useNavigate();
//   const { user } = useGetUserInfo();
//   const [isActive, setIsActive] = useState(false);
//   const profileImageUrl = user.isUser ? getPbImageURL(user, 'userPhoto') : defaultImg;
//   const { userNickName, email, userSize: size, userColor } = user;
//   //console.log('user', user);
//   console.log(!user.userPhoto);
//   // const form = new FormData();
//   // form.append('user', user);
//   // console.log(form.get('user'));
//   // console.log(user);
//   const updateProfileImage = async (e) => {
//     // const [file] = e.target.files;
//     // const userPhoto = URL.createObjectURL(file);
//     // const form = new FormData();
//     // form.append('userPhoto', userPhoto);
//     // console.log(form.get('userPhoto').replace('blob:', ''));
//     // console.log({ ...user, userPhoto: form.get('userPhoto') }); // selectedFile must be File or Blob instance
//     // const aa = await updateUserData(user.id, {
//     //   ...user,
//     //   userPhoto: form.get('userPhoto').replace('blob:', ''),
//     // });
//     // console.log('aa', aa);
//     // console.log(user.id, { ...user, userPhoto: form.get('avatar') });
//   };

//   //임시 모달
//   const modal = !user.isUser && (
//     <div className={S.modal__outer}>
//       <div className={S.modal}>
//         <h1>로그인 ㄴㄴ 임시 모달</h1>
//         <button onClick={() => navigate('/login')}>로그인 버튼</button>
//       </div>
//     </div>
//   );
//   //////////////로딩 구현

//   /***************************************************** */
//   // 로그아웃 구현 위한 부분
//   const [userId, setUserId] = useState(null); // userId 상태 추가

//   // 로그인된 사용자 정보 가져오기
//   useEffect(() => {
//     const authData = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
//     if (authData) {
//       const parsedAuth = JSON.parse(authData);
//       if (parsedAuth && parsedAuth.token) {
//         setUserId(parsedAuth.token.id); // userId 설정
//       }
//     }
//   }, []);

//   const { syncLikeLocalToOriginAndServer } = useLikeSync(userId); // userId 전달

//   const logout = async () => {
//     await syncLikeLocalToOriginAndServer(); // 로그아웃 시 서버에 like-origin 업데이트
//     console.log('syncLikeL어쩌구 마이페이지에서 실행 완료');
//     pb.authStore.clear(); // 로그아웃 시 스토리지에서 pb_auth 삭제
//     // sessionStorage와 localStorage에서 pb_auth 삭제
//     sessionStorage.removeItem('pb_auth');
//     localStorage.removeItem('pb_auth');
//   };

//   /***************************************************** */

//   return (
//     <>
//       <Helmet>
//         <title> 마이페이지 | StyleCast - 나만의 스타일 캐스트</title>
//         <meta property="og:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
//         <meta property="twitter:title" content="마이페이지 | StyleCast - 나만의 스타일 캐스트" />
//         <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
//         <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
//         <meta
//           name="keywords"
//           content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러"
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
//         <meta property="og:url" content="https://stylecast.netlify.app/" />
//         <meta property="og:site:author" content="TopTen" />
//         <link rel="canonical" href="https://stylecast.netlify.app/" />
//       </Helmet>
//       <div className={S.wrapComponent}>
//         {modal}
//         <div className={S.profile}>
//           <div className={S.profile__info}>
//             <h2>{user.isUser ? userNickName : '환영해요'}</h2>
//             <p className={S.email}>{user.isUser ? email : 'E-mail'}</p>
//             <p className={S.size}>Size: {user.isUser ? size : ''}</p>
//             <p className={S.personal__color}>Personal color {user.isUser ? userColor : ''}</p>
//           </div>
//           <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
//         </div>
//         <ul>
//           {user.isUser
//             ? NAV.map(({ text, path }, index) => <NavList key={index} text={text} link={path} />)
//             : ''}
//         </ul>
//         <div className="logoutButton">
//           <Link to="/">
//             <button type="button" onClick={logout}>
//               로그아웃
//             </button>
//           </Link>
//         </div>
//         <div className={S.img__container}>
//           <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
//           <button className={S.camera__button} onClick={() => setIsActive(true)}>
//             <img className={S.camera__icon} src={'/icon/camera.png'} alt="프로필 이미지" />
//           </button>
//         </div>
//       </div>
//       {/* <ul>
//         {user.isUser
//           ? NAV.map(({ text, path }, index) => <NavList key={index} text={text} link={path} />)
//           : ''}
//       </ul> */}
//       <div className={clsx(S.profile__change__popup, { [S.active]: isActive })}>
//         <div>
//           <h2>사진 등록</h2>
//           <button onClick={() => setIsActive(false)}>
//             <img src="/icon/icon-button-close.png" />
//           </button>
//         </div>
//         <ul>
//           <li>
//             <img src="/icon/camera2.png" alt="" />
//             카메라로 촬영하기
//           </li>
//           <li>
//             <input
//               type="file"
//               accept="image/jpg,image/png,image/webp,image"
//               onChange={updateProfileImage}
//             />
//             <img src="/icon/picture.png" alt="" />
//             앨범에서 선택하기
//           </li>
//         </ul>
//       </div>
//       {/* </div>
//       </div> */}
//     </>
//   );
// }
// //className={clsx(S.button, { [S.active]: active })}
// export default MyPage;
