import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/Login.module.scss';
import { useNavigate } from 'react-router-dom';

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

// 세션 스토리지에 저장 설정
pb.authStore.save = (model, token, expiration) => {
  sessionStorage.setItem('pb_auth', JSON.stringify({ model, token, expiration }));
};

pb.authStore.clear = () => {
  sessionStorage.removeItem('pb_auth');
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 세션 스토리지에서 로그인 상태 불러오기
  const loadSessionFromStorage = () => {
    const sessionData = sessionStorage.getItem('pb_auth');
    if (sessionData) {
      const { model, token, expiration } = JSON.parse(sessionData);
      pb.authStore.save(model, token, expiration);
    }
  };

  useEffect(() => {
    loadSessionFromStorage();
  }, []);

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

        // 세션 스토리지에 저장된 데이터 확인 (디버깅용)
        //console.log('세션 스토리지 데이터:', sessionStorage.getItem('pb_auth'));

        // 메인 페이지로 리다이렉트
        navigate('/main');
    } catch (error) {
        // 로그인 실패 시 에러 처리
        console.error('로그인 실패:', error);
        setEmailError('이메일 또는 비밀번호가 잘못되었습니다.');
        setPasswordError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
};

  return (
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
          type="password"
          description="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordError}
        />
        
        <Button text="로그인" type="submit" disabled={emailError || passwordError} />
      </form>

      <div className={styles.joinGroup}>
        <a href="/findpassword">비밀번호 찾기</a>
        <span aria-hidden="true" className={styles.distinguished}>|</span>
        <a href="/RegisterPage">회원가입</a>
      </div>

      {isLoggedIn && <p>로그인 성공! 환영합니다.</p>}
    </div>
  );
}

export default LoginPage;