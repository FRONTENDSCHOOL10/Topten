import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/Login.module.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// 이메일 유효성 검사 함수
export function emailReg(text) {
  const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(text).toLowerCase());
}

// 비밀번호 유효성 검사 함수
export function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,12}$/;
  return re.test(String(text));
}

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// 세션 스토리지와 로컬 스토리지에 저장 설정
pb.authStore.save = (model, token, expiration) => {
  const authData = { model, token, expiration };

  // 세션 스토리지에 저장
  sessionStorage.setItem('pb_auth', JSON.stringify(authData));

  // 로컬 스토리지에도 저장
  localStorage.setItem('pb_auth', JSON.stringify(authData));
};

pb.authStore.clear = () => {
  // 세션 스토리지와 로컬 스토리지에서 모두 삭제
  sessionStorage.removeItem('pb_auth');
  localStorage.removeItem('pb_auth');
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // 세션 또는 로컬 스토리지에서 로그인 상태 불러오기
  const loadSessionFromStorage = () => {
    // 세션 스토리지에서 먼저 가져오고 없으면 로컬 스토리지에서 가져옴
    const sessionData = sessionStorage.getItem('pb_auth') || localStorage.getItem('pb_auth');
    if (sessionData) {
      const { model, token, expiration } = JSON.parse(sessionData);
      pb.authStore.save(model, token, expiration);
      setIsLoggedIn(true); // 로그인 상태를 true로 설정
      setRedirecting(true); // 리다이렉션 상태를 true로 설정
    }
    setLoading(false); // 로딩 상태를 false로 설정
  };

  useEffect(() => {
    loadSessionFromStorage();
  }, []);

  // 로딩 상태 확인 및 리다이렉션
  useEffect(() => {
    if (!loading && redirecting) {
      // 2초 후에 메인 페이지로 리다이렉트
      const timer = setTimeout(() => {
        navigate('/main');
      }, 3000);

      // 타이머 클리너
      return () => clearTimeout(timer);
    }
  }, [loading, redirecting, navigate]);

  // 이메일 입력 핸들러
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!emailReg(emailValue)) {
      setEmailError('유효한 이메일을 입력하세요.');
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (!pwReg(passwordValue)) {
      setPasswordError('영문자, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 로그인 핸들러
  const handleLogin = async (e) => {
    e.preventDefault();

    // 최종 유효성 검사
    if (emailError || passwordError) {
      return;
    }

    try {
      // PocketBase의 authWithPassword API를 사용하여 로그인
      const authData = await pb.collection('users').authWithPassword(email, password);

      // 로그인 성공 시 토큰과 유저 정보 저장
      console.log('로그인 성공:', authData);
      console.log('JWT 토큰:', authData.token); // JWT 토큰 확인
      console.log('유저 ID:', authData.record.id); // 유저 ID 확인

      setIsLoggedIn(true); // 로그인 상태 업데이트

      // 메인 페이지로 리다이렉트
      navigate('/main');
    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.error('로그인 실패:', error);
      setEmailError('이메일 또는 비밀번호가 잘못되었습니다.');
      setPasswordError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  // 비밀번호 보기 토글 핸들러
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 상태일 때 보여줄 내용
  }

  return (
    <>
      <Helmet>
        <title>로그인 | StyleCast - 나만의 스타일 캐스트</title>
        <meta name="description" content="Stylecast의 introPage" />
        <meta property="og:title" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="twitter:title" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="StyleCast - 나만의 스타일캐스트" />
        <meta property="og:image" content="https://stylecast.netlify.app/og-sc.png" />
        <meta property="og:site:author" content="TopTen" />
      </Helmet>
      <div className={styles.wrapComponent}>
        <div className={styles['top__title']}>
          <h2 className={styles['top__title--big']}>
            스타일 캐스트에
            <br />
            오신 것을 환영해요!
          </h2>
          <p className={styles['top__title--sm']}>
            스타일 캐스트가 처음이시라면
            <br />
            회원가입을 하시고
            <br />
            나에게 맞는 맞춤 추천을 받으세요.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <Input
            text="이메일"
            type="email"
            description="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            errorMessage={emailError}
          />

          <Input
            text="비밀번호"
            type={showPassword ? 'text' : 'password'}
            description="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            errorMessage={passwordError}
          />
          
          <div className={styles.showPassword}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <label htmlFor="showPassword"> 비밀번호 보기</label>
          </div>
          
          <Button text="로그인" type="submit" disabled={emailError || passwordError} />
        </form>

        <div className={styles.joinGroup}>
          <NavLink to="/findpassword">
            비밀번호 찾기
          </NavLink>
          <span aria-hidden="true" className={styles.distinguished}>|</span>
          <NavLink to="/register">
            회원가입
          </NavLink>
        </div>

        {redirecting && <div className={styles.redirecting}><div className={styles.pop}><p>😮 오! 이미 로그인 되어있어요.<br />메인페이지로 이동할게요.</p></div></div>}
      </div>
    </>
  );
}

export default LoginPage;