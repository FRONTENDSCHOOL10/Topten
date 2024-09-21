import styles from '../styles/pages/RegisterPage.module.scss';
import { Input, Button, Form } from '@/components';
import Select from '../components/Select/Select';
import { useState, useEffect } from 'react';
import RegisterCheckbox from '../components/RegisterCheckbox/RegisterCheckbox';
import { createUser } from '../api/createUser';
import { validateEmail, validateName, validatePassword } from '../api/validation';
import { getData } from '../api/getData';
import loadToast from '../api/loadToast';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { COLORS, GENDER, POLICY, SIZE, INITCHECKED, INITUSER, WARNING } from '../data/constant';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITUSER);
  const [visible, setVisible] = useState({
    name: null,
    email: false,
    password: null,
    checkPassword: null,
  });
  const [checkAll, setCheckAll] = useState(false);
  const [isChecked, setIsChecked] = useState(INITCHECKED);

  //회원가입
  const handleRegister = async (e) => {
    // e.preventDefault();
    try {
      console.log(user);
      const createdUserInfo = await createUser(user); //;
      console.log('createdUserInfo', createdUserInfo);
      loadToast('회원가입이 완료되었습니다', '📌');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // 유효성 검사
  const validateCheckPassword = (checkPassword) => {
    if (user.password.length === 0) return;
    return user.password !== checkPassword ? false : true;
  };

  //이메일 중복 검사
  const checkEmail = async () => {
    if (user.email.length === 0 || !!visible.email) {
      return;
    }

    const sameEmail = await getData('users', {
      filter: `username='${user.username}'|| email='${user.email}'`,
    }).then((result) => result.length);

    if (sameEmail) {
      loadToast('이메일이 이미 존재합니다', '📌');
      return;
    } else {
      loadToast('사용 가능한 이메일입니다', '📌');
    }
  };

  // 상태 업데이트
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (Object.values(isChecked).includes(false)) {
      setCheckAll(false);
    } else {
      setCheckAll(true);
    }
  }, [isChecked]);

  //
  const handleCheckAll = () => {
    const checkedAll = {
      0: true,
      1: true,
      2: true,
    };

    const uncheckedAll = {
      0: false,
      1: false,
      2: false,
    };

    if (checkAll) {
      setIsChecked(uncheckedAll);
    } else {
      setIsChecked(checkedAll);
    }

    setCheckAll((prev) => !prev);
  };

  const handleCheck = (index) => {
    setIsChecked((prev) => ({
      ...prev,
      [index]: !isChecked[index],
    }));
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    if (name === 'name' && !validateName(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    }
    if (name === 'email' && !validateEmail(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    }
    if (name === 'password' && !validatePassword(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    }
    if (name === 'checkPassword' && !validateCheckPassword(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    } else {
      return setVisible((prev) => ({ ...prev, [name]: false }));
    }
  };

  const nameWarn = visible.name && WARNING.nameMsg;
  const emailWarn = visible.email && WARNING.emailMsg;
  const passwordWarn = visible.password && WARNING.passwordMsg;
  const passwordCheckWarn = visible.checkPassword && WARNING.passwordCheckMsg;
  const genderComponent = GENDER.map((value, index) => (
    <div key={index}>
      <input type="radio" id={value} name="gender" value={value} onChange={handleChange} />
      <label htmlFor={value}>{value}</label>
    </div>
  ));
  const policyComponent = POLICY.map((value, index) => (
    <RegisterCheckbox
      key={index}
      id={index}
      text={value}
      checked={isChecked[index]}
      onChange={() => handleCheck(index)}
    />
  ));
  const disabled = Object.values(visible).filter((item) => item === false).length < 4;

  return (
    <>
      <Helmet>
        <title>회원가입 | StyleCast - 나만의 스타일 캐스트</title>
        <meta name="description" content="Stylecast의 introPage" />
        <meta property="og:title" content="StyleCast - 회원가입" />
        <meta property="twitter:title" content="StyleCast - 회원가입" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="StyleCast의 회원가입 페이지" />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="TopTen" />
      </Helmet>
      <section className={styles.wrapComponent}>
        <h1 className={styles.title}>
          스타일 캐스트에
          <br />
          오신 것을 환영해요!
        </h1>
        <p className={styles.description}>
          스타일 캐스트에 가입하시려면
          <br />
          아래 정보를 입력해주세요.
        </p>

        <Form>
          <Input
            text={'이름'}
            name="name"
            description={'이름을 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={nameWarn}
          />
          <Input
            text={'이메일'}
            name="email"
            description={'이메일을 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={emailWarn}
            onButtonClick={checkEmail}
            buttonText="중복확인"
            active={true}
          />
          <Input
            text={'비밀번호'}
            name="password"
            type={'password'}
            description={'비밀번호를 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={passwordWarn}
            activeVisible={true}
          />
          <Input
            text={'비밀번호 확인'}
            name="checkPassword"
            type={'password'}
            description={'비밀번호를 한번 더 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={passwordCheckWarn}
            activeVisible={true}
          />
          <Input
            text={'닉네임'}
            name="nickName"
            description={'닉네임을 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className={styles.ootd__info}>
            맞춤 OOTD 추천을 위해 <br />
            아래 정보를 입력해주세요.
          </p>
          <div className={styles.radio__container}>
            <label className={styles.label}>
              성별 <span className={styles.mark}>*</span>
            </label>
            <div className={styles.radio__inner}>{genderComponent}</div>
          </div>
          <div className={styles.select__container}>
            <h2 className={styles.select__title}>체형</h2>
            <Select name="topSize" text="상의 사이즈" items={SIZE} onChange={handleChange} />
            <Select name="bottomSize" text="하의 사이즈" items={SIZE} onChange={handleChange} />
          </div>
          <div className={styles.select__container}>
            <h2 className={styles.select__title}>퍼스널 컬러</h2>
            <Select name="colors" items={COLORS} onChange={handleChange} />
          </div>

          <div className={styles.policy__container}>
            <p className={styles.policy__title}>아래 이용약관에 동의해주세요</p>
            <div className={styles.policyGr}>
              <input type="checkbox" id="checkAll" checked={checkAll} onChange={handleCheckAll} />
              <label className={styles.checkAll__title} htmlFor="checkAll">
                전체 동의합니다
              </label>
            </div>
            {policyComponent}
          </div>
          <div className={styles.button__container}>
            <Button
              text="가입하기"
              type="button"
              linkTo={'/'}
              disabled={disabled}
              onClick={handleRegister}
            />
          </div>
        </Form>
        <Toaster />
      </section>
    </>
  );
}

export default RegisterPage;
