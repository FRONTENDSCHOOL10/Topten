import React, { useState, useEffect, useRef } from 'react';
import Input from '@/components/Input/Input_kbr';
import Button from '@/components/Button/Button';
import styles from '@/styles/pages/FindPasswordPage.module.scss';
import useDocumentTitle from './../utils/useDocumentTitle';
import { throttle } from './../utils/throttle';
import Form from './../components/Form/Form';
import pb from './../api/pocketbase';

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

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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

      console.log(rep)


      // 이메일 발송 성공 메시지 출력
      alert(email + '로 비밀번호 초기화 이메일을 발송했습니다. 비밀번호 재설정 후 로그인하세요.');


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
      <div>
        <h2>비밀번호 찾기</h2>
        <p>
          비밀번호를 찾고자 하는 <br /> 이름과 이메일을 입력해주세요.
        </p>
      </div>
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
          inputRef={emailRef}
          onChange={handleEmailChange}
          onButtonClick={handleAction}
          onBlur={handleBlur}
          warningText={warnings.email}
          warningStyle={isEmailVerified ? { color: 'rgb(27, 182, 104)' } : { color: 'red' }}
        />
      </Form>

      {/* 새 비밀번호 변경 입력칸 */}
      {/* - 이메일 인증이 완료된 경우에만 보여줌 */}
      {isEmailVerified && (
        <div className={styles.successMessage}>
          <p>이메일 인증이 완료</p>
        </div>
      )}
    </>
  );
}

export default FindPasswordPage;
