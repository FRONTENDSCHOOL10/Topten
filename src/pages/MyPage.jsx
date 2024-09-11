import S from './../styles/pages/MainPage.module.scss';
import NavList from '../components/navList/navList';
import getPbImageURL from './../api/getPbImageURL';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { NAV } from '../data/constant';

function MyPage(props) {
  const { user } = useGetUserInfo();
  const profileImageUrl = user ? getPbImageURL(user, 'userPhoto') : null;
  const { userNickName, email, userSize: size, userColor } = user;

  //////////////로딩 구현

  return (
    <div className={S.wrapComponent}>
      <div className={S.profile}>
        <div className={S.profile__info}>
          <h2>{userNickName}</h2>
          <p className={S.email}>{email}</p>
          <p className={S.size}>Size: {size}</p>
          <p className={S.personal__color}>Personal color {userColor}</p>
        </div>
        <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
      </div>
      <ul>
        {NAV.map(({ text, path }, index) => (
          <NavList key={index} text={text} link={path} />
        ))}
      </ul>
    </div>
  );
}

export default MyPage;

// pb.authStore.clear = () => {
//   console.log('pb.authStore.clear에서 실행');
//   sessionStorage.removeItem('pb_auth');
//   localStorage.removeItem('pb_auth');
// };
{
  /* 마이
      <Link to="/">
        <button type="button" onClick={logout}>
          로그아웃
        </button>
      </Link> */
}
// const logout = () => {
//   alert('로그아웃되었습니다.');
//   pb.authStore.clear();
// };
