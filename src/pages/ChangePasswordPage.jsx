import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangePasswordPage.module.scss';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';
const ChangePasswordPage = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const user = JSON.parse(sessionStorage.getItem('pb_auth')).token;

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
  return (
    <div className={S.wrapComponent}>
      <EditHeader
        navText="비밀번호 변경"
        mainText="비밀번호를 변경할 수 있어요."
        description="제형에 맞는 옷으로 추천해드릴게요 언젠가는.."
      />
      <Form>
        <Input
          text={'현재 비밀번호'}
          name="currentPassword"
          type={'password'}
          description={'비밀번호를 입력해주세요'}
          onChange={handleChange}
          // onBlur={handleBlur}
          // warningText={passwordWarn}
          // activeVisible={true}
        />
        <Input
          text={'새 비밀번호'}
          name="newPassword"
          type={'password'}
          description={'새 비밀번호를 입력해주세요'}
          onChange={handleChange}
          // onBlur={handleBlur}
          // warningText={passwordCheckWarn}
          // activeVisible={true}
        />
        <Input
          text={'새 비밀번호 확인'}
          name="confirmNewPassword"
          type={'password'}
          description={'새 비밀번호를 한번 더 입력해주세요'}
          onChange={handleChange}
          // onBlur={handleBlur}
          // warningText={passwordCheckWarn}
          // activeVisible={true}
        />
        <Button text={'비밀번호변경'} onClick={handleClick} />
      </Form>
    </div>
  );
};

export default ChangePasswordPage;
// const data = {
//   "username": "test_username_update",
//   "emailVisibility": false,
//   "password": "87654321",
//   "passwordConfirm": "87654321",
//   "oldPassword": "12345678",
//   "userID": "test",
//   "userNickName": "test",
//   "userGender": "남자",
//   "userSize": [
//       "XS"
//   ],
//   "userColor": [
//       "봄웜"
//   ]
// };
