import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangePasswordPage.module.scss';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';

import { validatePassword } from '../api/validation';
import { WARNING } from '../data/constant';

import { Toaster } from 'react-hot-toast';
import useUserStore from '@/stores/userStore';
import loadToast from '@/api/loadToast';
import { Helmet } from 'react-helmet-async';

const ChangePasswordPage = () => {
  const { user } = useUserStore();

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [visible, setVisible] = useState({
    newPassword: null,
    confirmNewPassword: null,
  });

  const validateCheckPassword = (confirmNewPassword) => {
    if (passwords.newPassword.length === 0) return;
    return passwords.newPassword !== confirmNewPassword ? false : true;
  };

  const handleBlur = (e) => {
    const { value, name } = e.target;
    if (name === 'currentPassword' && !validatePassword(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    }
    if (name === 'newPassword' && !validatePassword(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    }
    if (name === 'confirmNewPassword' && !validateCheckPassword(value)) {
      return setVisible((prev) => ({ ...prev, [name]: true }));
    } else {
      return setVisible((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const updatedPassword = {
        oldPassword: passwords.currentPassword,
        password: passwords.newPassword,
        passwordConfirm: passwords.confirmNewPassword,
      };

      const updatedUser = await updateUserData('users', user.id, updatedPassword);
      loadToast('비밀번호 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };

  const passwordWarn = visible.currentPassword && WARNING.passwordMsg;
  const newPasswordWarn = visible.newPassword && WARNING.passwordMsg;
  const confirmNewPasswordWarn = visible.confirmNewPassword && WARNING.passwordCheckMsg;
  const disabled = Object.values(visible).filter((item) => item === false).length < 3;
  return (
    <>
      <Helmet>
        <title>비밀번호 변경 | StyleCast - 나만의 스타일 캐스트</title>
        <meta property="og:title" content="비밀번호 변경 | StyleCast - 나만의 스타일 캐스트" />
        <meta property="twitter:title" content="비밀번호 변경 | StyleCast - 나만의 스타일 캐스트" />
        <meta name="description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta property="og:description" content="날씨에 따른 옷차림을 추천해주는 StyleCast" />
        <meta name="keywords" content="날씨, 기온, 옷차림, 뭐입지, 입을옷, 의류, 기상정보, 룩북, 체형, 퍼스널컬러" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://stylecast.netlify.app/image/og-sc.png" />
        <meta property="og:url" content="https://stylecast.netlify.app/" />
        <meta property="og:site:author" content="TopTen" />
        <link rel="canonical" href="https://stylecast.netlify.app/" />
      </Helmet>
      <div className={S.wrapComponent}>
        <EditHeader
          navText="비밀번호 변경"
          mainText="비밀번호를 변경할 수 있어요."
          description="비밀번호를 변경할 수 있어요"
        />
        <Form>
          <Input
            text={'현재 비밀번호'}
            name="currentPassword"
            type={'password'}
            description={'비밀번호를 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={passwordWarn}
          />
          <Input
            text={'새 비밀번호'}
            name="newPassword"
            type={'password'}
            description={'새 비밀번호를 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={newPasswordWarn}
          />
          <Input
            text={'새 비밀번호 확인'}
            name="confirmNewPassword"
            type={'password'}
            description={'새 비밀번호를 한번 더 입력해주세요'}
            onChange={handleChange}
            onBlur={handleBlur}
            warningText={confirmNewPasswordWarn}
          />
          <div className={S.button__container}>
            <Button disabled={disabled} text={'비밀번호변경'} onClick={handleClick} />
          </div>
        </Form>
        <Toaster />
      </div>
    </>
  );
};

export default ChangePasswordPage;
