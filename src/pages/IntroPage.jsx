import { useEffect } from 'react';
import { animate } from 'motion';
// import Button from '../components/Button/Button';
import Button from '../components/Button/Button_hsw';

import { NavLink } from 'react-router-dom';
import logoSun from '/image/logo-sun.png';
import logoCloud from '/image/logo-cloud.png';
import { Helmet } from 'react-helmet-async';
import S from '@/styles/pages/IntroPage.module.scss';
import clsx from 'clsx';

const IntroPage = () => {
  const classes = {
    logoWrapper: clsx(S.logo__wrapper),
    sun: clsx(S.sun),
    cloud: clsx(S.cloud),
    buttonArea: clsx(S.buttonArea),
    authArea: clsx(S.authArea),
    divider: clsx(S.divider),
    link: clsx(S.link),
  };

  useEffect(() => {
    // 구름이 먼저 나타나도록 애니메이션
    animate(`.${S.cloud}`, { opacity: [0, 1] }, { duration: 1, easing: 'ease-out', delay: 1 });

    // 해가 구름 뒤에서 위로 올라오면서 나타나도록 애니메이션
    animate(
      `.${S.sun}`,
      { opacity: [0, 1], translateY: [20, 0] },
      { duration: 1.5, easing: 'ease-out', delay: 2 }
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>StyleCast - 나만의 스타일캐스트</title>
        <meta name="description" content="Stylecast의 introPage" />
        <meta property="og:title" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="twitter:title" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="TopTen" />
      </Helmet>
      <section id="page">
        <div className={classes.logoWrapper}>
          {/* logoCloud 이미지 */}
          <img src={logoCloud} alt="StyleCastLogo Cloud" className={classes.cloud} />

          {/* logoSun 이미지 */}
          <img src={logoSun} alt="StyleCastLogo Sun" className={classes.sun} />

          <h1>나만을 위한 스타일 캐스터</h1>
        </div>

        <div className={classes.buttonArea}>
          <Button text="시작하기" active={true} icon={null} />
          <div className={classes.authArea}>
            <NavLink to="/login" className={classes.link}>
              로그인
            </NavLink>

            <div className={classes.divider}></div>
            <NavLink to="/register" className={classes.link}>
              회원가입
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroPage;
