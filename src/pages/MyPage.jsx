import S from './../styles/pages/MainPage.module.scss';
import NavList from '../components/navList/navList';
import getPbImageURL from './../api/getPbImageURL';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { NAV } from '../data/constant';
import defaultImg from '/image/happiness.png';
import { useNavigate } from 'react-router-dom';

function MyPage(props) {
  const navigate = useNavigate();
  const { user } = useGetUserInfo();
  const profileImageUrl = user.isUser ? getPbImageURL(user, 'userPhoto') : defaultImg;
  const { userNickName, email, userSize: size, userColor } = user;

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
        <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
      </div>
      <ul>
        {user.isUser
          ? NAV.map(({ text, path }, index) => <NavList key={index} text={text} link={path} />)
          : ''}
      </ul>
    </div>
  );
}

export default MyPage;
