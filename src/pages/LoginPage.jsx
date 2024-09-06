import React, { useState, useRef, useEffect } from 'react';
import Form from './../components/Form/Form';
import Input from '@/components/Input/Input_kbr';
import Button from '@/components/Button/Button';
import pb from './../api/pocketbase';
import { Helmet } from 'react-helmet-async';
import styles from '@/styles/pages/Login.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // 비밀번호는 영문자, 숫자, 특수문자를 포함하고 8자 이상, 12자 이하
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,12}$/;
  return passwordRegex.test(password);
}

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
  const [showPassword, setShowPassword] = useState(false);
  const [warnings, setWarnings] = useState({ email: '', password: '' });
  const [redirecting, setRedirecting] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      setWarnings((prev) => ({ ...prev, email: '유효한 이메일 주소를 입력하세요.' }));
    } else if (name === 'password' && !validatePassword(value)) {
      setWarnings((prev) => ({
        ...prev,
        password: '비밀번호는 영문자, 숫자, 특수문자를 포함하여 최소 8자 이상 입력해야 합니다.',
      }));
    } else {
      setWarnings((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      emailRef.current.focus();
      setWarnings((prev) => ({ ...prev, email: '이메일을 입력하세요.' }));
      return;
    }
    if (!password) {
      passwordRef.current.focus();
      setWarnings((prev) => ({ ...prev, password: '비밀번호를 입력하세요.' }));
      return;
    }

    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      console.log('로그인 성공:', authData);

      // 페이지 전환 로직
      navigate('/main');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await pb.authStore.model;
        if (user) {
          setRedirecting(true);
          setTimeout(() => {
            navigate('/main');
          }, 3000);
        }
      } catch (error) {
        console.error('로그인 상태 확인 실패:', error);
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>로그인 | StyleCast - 나만의 스타일 캐스트</title>
      </Helmet>
      
      <div className="wrapComponent">
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
        {redirecting && (
          <div className={styles.redirecting}>
            <div className={styles.pop}>
              <p>😮 오! 이미 로그인 되어있어요.<br />메인페이지로 이동할게요.</p>
            </div>
          </div>
        )}
        {!redirecting && (
          <Form onSubmit={handleLogin}>
            <Input
              text="이메일"
              description="이메일을 입력하세요"
              name="email"
              value={email}
              inputRef={emailRef}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              warningText={warnings.email}
            />
            <Input
              text="비밀번호"
              description="비밀번호를 입력하세요"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              inputRef={passwordRef}
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              warningText={warnings.password}
            />
            <label htmlFor="showPassword" className={styles.showPassword}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              비밀번호 보기
            </label>
            <Button text="로그인" onClick={handleLogin} />
          </Form>
        )}
        <div className={styles.joinGroup}>
          <NavLink to="/findpassword">
            비밀번호 찾기
          </NavLink>
          <span aria-hidden="true" className={styles.distinguished}>|</span>
          <NavLink to="/register">
            회원가입
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LoginPage;