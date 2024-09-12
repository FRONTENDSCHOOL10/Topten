import React, { useState } from 'react';
import EditHeader from '../components/EditHeader/EditHeader';
import S from './../styles/pages/ChangeFitPage.module.scss';
import { SIZE } from '../data/constant';
import Select from '../components/Select/Select';
import Button from '../components/Button/Button';
import updateUserData from '../api/updateData';

const ChangeFitPage = () => {
  const [userSize, setUserSize] = useState({ topSize: '', bottomSize: '' });
  const user = JSON.parse(sessionStorage.getItem('pb_auth')).token;

  //공백 조건 처리 필
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserSize((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const updatedSize = { ...user, userSize: [userSize.topSize, userSize.bottomSize] };
      const updatedUser = await updateUserData(user.id, updatedSize);
      loadToast('사이즈 변경 완료', '📌');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={S.wrapComponent}>
      <EditHeader
        navText="나의 체형"
        mainText={`${user.userNickName} 님의 체형`}
        description="제형에 맞는 옷으로 추천해드릴게요 언젠가는.."
      />

      <div className={S.select__container}>
        <Select name="topSize" text="상의 사이즈" items={SIZE} onChange={handleChange} />
      </div>
      <div className={S.select__container}>
        <Select name="bottomSize" text="하의 사이즈" items={SIZE} onChange={handleChange} />
      </div>
      <div className={S.button__container}>
        <Button text="변경하기" onClick={handleClick} />
      </div>
    </div>
  );
};

export default ChangeFitPage;
