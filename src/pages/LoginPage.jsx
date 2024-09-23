import { useState, useRef, useEffect } from 'react';
import { Input, Button, Form } from '@/components';
import pb from './../api/pocketbase';
import { Helmet } from 'react-helmet-async';
import styles from '@/styles/pages/Login.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { validatePassword, validateEmail } from './../api/validation';
import useUserStore from '@/stores/userStore';

pb.authStore.save = (model, token) => {
  const authData = { token, model };

  sessionStorage.setItem('pb_auth', JSON.stringify(authData));
  localStorage.setItem('pb_auth', JSON.stringify(authData));
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warnings, setWarnings] = useState({ email: '', password: '', auth: '' });
  const [redirecting, setRedirecting] = useState(false);
  const { login } = useUserStore();

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
      const result = await login(email, password);

      if (result.success) {
        // Navigate to the main page upon successful login
        navigate('/main');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setWarnings((prev) => ({
        ...prev,
        auth: '이메일 또는 비밀번호를 확인해주세요.',
      }));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const sessionAuth = sessionStorage.getItem('pb_auth');
        const localAuth = localStorage.getItem('pb_auth');

        const authData = sessionAuth || localAuth; // 세션 스토리지가 우선, 없으면 로컬 스토리지
        if (authData) {
          const parsedAuth = JSON.parse(authData);
          if (parsedAuth && parsedAuth.token) {
            // 유저가 로그인되어 있으면 2초 후 메인 페이지로 리다이렉트
            setRedirecting(true);
            setTimeout(() => {
              navigate('/main');
            }, 2000);
          }
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
        <meta property="og:title" content="로그인 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="로그인 | StyleCast - 나만의 스타일 캐스트" />
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
              <p>
                😮 오! 이미 로그인 되어있어요.
                <br />
                메인페이지로 이동할게요.
              </p>
            </div>
          </div>
        )}
        {!redirecting && (
          <Form onSubmit={handleLogin} className={styles.loginForm}>
            <Input
              text="이메일"
              description="이메일을 입력하세요"
              name="email"
              value={email}
              inputRef={emailRef}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              warningText={warnings.email || warnings.auth}
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
              warningText={warnings.password || warnings.auth}
            />
            <div className={styles.showPasswordWrap}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="showPassword">비밀번호 보기</label>
            </div>
            <div className={styles.buttonArea}>
              <Button type="submit" text="로그인" active={true} />
            </div>
          </Form>
        )}
        <div className={styles.joinGroup}>
          <NavLink to="/findpassword">비밀번호 찾기</NavLink>
          <span aria-hidden="true" className={styles.distinguished}>
            |
          </span>
          <NavLink to="/register">회원가입</NavLink>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
