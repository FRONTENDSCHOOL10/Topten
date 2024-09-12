import S from './../styles/pages/MainPage.module.scss';
import NavList from '../components/NavList/NavList';
import getPbImageURL from './../api/getPbImageURL';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { NAV } from '../data/constant';
import defaultImg from '/image/happiness.png';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useState } from 'react';
import updateUserData from '../api/updateData';

function MyPage(props) {
  const navigate = useNavigate();
  const { user } = useGetUserInfo();
  const [isActive, setIsActive] = useState(false);
  const profileImageUrl = user.isUser ? getPbImageURL(user, 'userPhoto') : defaultImg;
  const { userNickName, email, userSize: size, userColor } = user;
  //console.log('user', user);
  console.log(!user.userPhoto);
  // const form = new FormData();
  // form.append('user', user);
  // console.log(form.get('user'));
  // console.log(user);
  const updateProfileImage = async (e) => {
    // const [file] = e.target.files;
    // const userPhoto = URL.createObjectURL(file);
    // const form = new FormData();
    // form.append('userPhoto', userPhoto);
    // console.log(form.get('userPhoto').replace('blob:', ''));
    // console.log({ ...user, userPhoto: form.get('userPhoto') }); // selectedFile must be File or Blob instance
    // const aa = await updateUserData(user.id, {
    //   ...user,
    //   userPhoto: form.get('userPhoto').replace('blob:', ''),
    // });
    // console.log('aa', aa);
    // console.log(user.id, { ...user, userPhoto: form.get('avatar') });
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

  return (
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
          <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
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
            카메라로 촬영하기
          </li>
          <li>
            <input
              type="file"
              accept="image/jpg,image/png,image/webp,image"
              onChange={updateProfileImage}
            />
            <img src="/icon/picture.png" alt="" />
            앨범에서 선택하기
          </li>
        </ul>
      </div>
    </div>
  );
}
//className={clsx(S.button, { [S.active]: active })}
export default MyPage;
