import S from './../styles/pages/MainPage.module.scss';
import NavList from '../components/NavList/NavList';
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
          <img className={S.profile__img} src={profileImageUrl} alt="프로필 이미지" />
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
      </div>
    </>
  );
}

export default MyPage;
