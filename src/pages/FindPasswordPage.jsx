import React, { useState, useEffect, useRef } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/FindPasswordPage.module.scss';
import useDocumentTitle from './../utils/useDocumentTitle';
import { throttle } from './../utils/throttle';
import Form from './../components/Form/Form';

// 유효성 검사 함수
function validateName(name) {
  const nameRegex = /^[가-힣]{2,6}$/;
  return nameRegex.test(name);
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function FindPasswordPage(props) {
  useDocumentTitle('비밀번호 찾기');

  // 이름과 이메일을 위한 상태 추가
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [warnings, setWarnings] = useState({ name: '', email: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // 입력 변경 시 상태 업데이트 함수
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // 입력 필드에서 포커스가 떼어졌을 때 유효성 검사
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

  // 버튼 활성화 상태 업데이트
  useEffect(() => {
    if (name && email && !warnings.name && !warnings.email) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, email, warnings]);

  // 이메일 인증 버튼 클릭 시
  const handleEmailButtonClick = () => {
    if (!name) {
      nameRef.current.focus();
      return;
    }
    if (!email) {
      emailRef.current.focus();
      return;
    }

    console.log('이름:', name);
    console.log('이메일:', email);

    // 이메일 인증 로직 추가
  };

  // 폼 제출 시 실행
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // 폼 데이터 추출(이메일, 비번)
      const formData = new FormData(e.currentTarget);

      // FormData에서 데이터를 추출
      const name = formData.get('name');
      const email = formData.get('email');

      // 데이터를 콘솔에 출력
      console.log('Name:', name);
      console.log('Email:', email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <h2>비밀번호 찾기</h2>
        <p>
          비밀번호를 찾고자 하는 <br /> 이름과 이메일을 입력해주세요.
        </p>
      </div>
      <Form onSubmit={handleSignIn}>
        <Input
          text={'이름'}
          description={'이름을 입력해주세요'}
          onChange={handleNameChange}
          onBlur={handleBlur}
          value={name}
          warningText={warnings.name}
          inputRef={nameRef}
        />

        <Input
          text={'이메일'}
          description={'이메일을 입력해주세요'}
          buttonText={'이메일 인증'}
          value={email}
          onChange={handleEmailChange}
          onButtonClick={handleEmailButtonClick}
          onBlur={handleBlur}
          warningText={warnings.email}
          inputRef={emailRef}
        />
      </Form>
    </>
  );
}

export default FindPasswordPage;
