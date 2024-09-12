import { useState, useEffect, useRef } from 'react';
import { Input, Button, Form } from '@/components';
import styles from './../styles/pages/FindPasswordPage.module.scss';
import pb from './../api/pocketbase';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { validateName, validateEmail } from './../api/validation';

function FindPasswordPage(props) {
  // 이름 상태
  const [name, setName] = useState('');

  // 이메일 상태
  const [email, setEmail] = useState('');

  // 경고 문구
  const [warnings, setWarnings] = useState({ name: '', email: '' });

  // 이메일 인증 상태 관리
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // 입력 변경 시 상태 업데이트 ----------------------------
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 입력 필드에서 포커스가 떠났을 때 ------------------------
  // - 유효성 검사
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'name' && !validateName(value)) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        name: '이름은 2자에서 6자 사이의 한글이어야 합니다.',
      }));
    } else if (name === 'email' && !validateEmail(value)) {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        email: '유효한 이메일 주소를 입력하세요.',
      }));
    } else {
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        [name]: '',
      }));
    }
  };

  // 이메일 인증 버튼 클릭 ------------------------
  // - 폼 제출
  const handleAction = async (e) => {
    e.preventDefault();

    // 입력 필드 검사
    if (!name) {
      nameRef.current.focus();
      return;
    }
    if (!email) {
      emailRef.current.focus();
      return;
    }

    // 데이터 검증 및 서버 요청
    try {
      // 입력값이 DB에 있는지 확인
      const user = await pb
        .collection('users')
        .getFirstListItem(`userID="${name}" && email="${email}"`);

      console.log('사용자:', user);

      // 비밀번호 재설정 이메일 전송 --------------------------
      const rep = await pb.collection('users').requestPasswordReset(email);

      console.log(rep);

      // 이메일 발송 성공 메시지 출력
      toast.success(
        `${email}로 \n 초기화 이메일을 발송했습니다. \n 비밀번호 재설정 후 로그인하세요.`,
        {
          style: {
            width: '250px',
            height: '85px',
            fontSize: '14px',
          },
          duration: 4000,
        }
      );

      // 이메일 인증 성공 시 상태 업데이트
      setIsEmailVerified(true);

      // 이메일 인증 완료 시 문구
      setWarnings({
        ...warnings,
        email: '비밀번호 재설정 이메일이 전송되었습니다.',
      });
    } catch (error) {
      console.error('사용자가 존재하지 않습니다.', error);

      setWarnings({
        ...warnings,
        email: '사용자를 찾을 수 없습니다.',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>비밀번호 찾기 페이지 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="비밀번호 찾기 페이지 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="비밀번호 찾기 페이지 | StyleCast - 나만의 스타일 캐스트" />
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

      <div className={styles.wrapComponent}>
        <div className={styles.title}>
          <h2>비밀번호 찾기</h2>
          <p>
            비밀번호를 찾고자 하는 <br /> 이름과 이메일을 입력해주세요.
          </p>
        </div>

        <Toaster />
        <Form onSubmit={handleAction}>
          <Input
            text={'이름'}
            description={'이름을 입력해주세요'}
            value={name}
            inputRef={nameRef}
            onChange={handleNameChange}
            onBlur={handleBlur}
            warningText={warnings.name}
          />
          <Input
            text={'이메일'}
            description={'이메일을 입력해주세요'}
            buttonText={'이메일 인증'}
            value={email}
            active={true}
            inputRef={emailRef}
            onChange={handleEmailChange}
            onButtonClick={handleAction}
            onBlur={handleBlur}
            warningText={warnings.email}
            warningStyle={isEmailVerified ? { color: 'rgb(27, 182, 104)' } : { color: 'red' }}
          />
        </Form>

        {isEmailVerified && (
          <div className={styles.successMessage}>
            <Button text="로그인 하러 가기" type="button" linkTo="/login" />
          </div>
        )}
      </div>
    </>
  );
}

export default FindPasswordPage;
