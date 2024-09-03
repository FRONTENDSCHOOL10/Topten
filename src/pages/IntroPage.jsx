import { useEffect } from 'react';
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';
import logoSun from '/icon/logo-sun.svg';
import logoCloud from '/icon/logo-cloud.svg';
import { Helmet } from 'react-helmet-async';
import S from '@/styles/pages/IntroPage.module.scss';
import { gsap } from 'gsap';
import clsx from 'clsx';

const IntroPage = () => {
  useEffect(() => {
    const sunElement = document.querySelector(`.${S.sun}`);
    const cloudElement = document.querySelector(`.${S.cloud}`);

    if (sunElement && cloudElement) {
      gsap.from(cloudElement, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.from(sunElement, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power2.out',
        delay: 1,
      });
    }
  }, []);
  const logo = clsx(S.logo__wrapper);
  const sunClass = clsx(S.sun);
  const cloudClass = clsx(S.cloud);

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
        <div className={logo}>
          <img src={logoSun} alt="StyleCastLogo Sun" className={sunClass} />
          <img src={logoCloud} alt="StyleCastLogo Cloud" className={cloudClass} />
          <h1>나만을 위한 스타일 캐스터</h1>
        </div>
      </section>
    </>
  );
};

export default IntroPage;
