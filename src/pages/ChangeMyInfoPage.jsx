import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangePage.module.scss';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';
import loadToast from '../api/loadToast';
import { Toaster } from 'react-hot-toast';
//잠시 커밋 확인 위한 주석
const ChangeMyInfoPage = () => {
  const [userNickName, setUserNickName] = useState('');
  const user = JSON.parse(sessionStorage.getItem('pb_auth')).token;

  const handleChange = (e) => {
    const { value } = e.target;
    setUserNickName((prev) => (prev = value));
  };

  const handleClick = async () => {
    try {
      const updatedNickName = { ...user, userNickName };
      const updatedUser = await updateUserData(user.id, updatedNickName);
      loadToast('닉네임 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={S.wrapComponent}>
      <EditHeader
        navText="회원정보 변경"
        mainText="회원정보 변경"
        description="닉네임 등 회원정보를 변경할 수 있어요"
      />
      <Input text="닉네임" onChange={handleChange} />
      <Button text="회원정보 변경" onClick={handleClick} />
      <Toaster />
    </div>
  );
};

export default ChangeMyInfoPage;
