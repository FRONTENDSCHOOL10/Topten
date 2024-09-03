import React, { useRef } from 'react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/FindPasswordPage.module.scss';
import useDocumentTitle from './../utils/useDocumentTitle';

function FindPasswordPage(props) {
  useDocumentTitle('비밀번호 찾기');

  const nameRef = useRef(null); // 이름 입력칸
  const emailRef = useRef(null); // 이메일 입력칸

  // 입력칸 입력 시
  const handleChange = (e) => {
    console.log(`변경됨: ${e.target.value}`); // 변경된 입력 값 출력
  };
  // const handleInput = throttle((e) => {
  //   const userInputValue = e.target.value;
    
  //   setInputValue(userInputValue);
  //   onInput?.(userInputValue);
  // }, 600);

  // 이메일 인증 버튼 누를 시
  const handleEmailButtonClick = (e) => {
    // e.preventDefault()

    alert(nameRef.current.value);
    alert(emailRef.current.value);

    if (nameRef.current.value === '') {
      alert('이름을 입력하세요.');
    }
    if (emailRef.current.value === '') {
      alert('이메일을 입력하세요.');
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

      <Input
        text={'이름'}
        description={'이름을 입력해주세요'}
        ref={nameRef}
        onChange={handleChange}
      />

      <Input
        text={'이메일'}
        description={'이메일을 입력해주세요'}
        buttonText={'이메일 인증'}
        onButtonClick={handleEmailButtonClick}
        ref={emailRef}
        onChange={handleChange}
      />
    </>
  );
}

export default FindPasswordPage;
