import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>고객센터 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="고객센터 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="고객센터 | StyleCast - 나만의 스타일 캐스트" />
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
          navText="고객센터"
          mainText="고객센터"
          description="문의주시면 언제든지 답변해드리겠습니다."
        />
        <div className={S.user__container}>{userInfo}</div>
      </div>
    </>
  );
};

export default CustomerServicePage;
