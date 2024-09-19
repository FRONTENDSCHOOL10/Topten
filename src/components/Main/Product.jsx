import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaBookmark } from 'react-icons/fa6';
import { IoRefreshSharp } from 'react-icons/io5';

import getPbImageURL from '@/api/getPbImageURL';
import createData from '../../api/createData';
import getDate from '../../api/getDate';
import loadToast from './../../api/loadToast';
import { getData } from '../../api/getData';

import useGetUserInfo from '../../hooks/useGetUserInfo';
import { BUTTONSTYLE, temperatureList } from './../../data/constant';
import useLikeStore from './../../stores/likeStore';

import { BookmarkModal, Button, CommonModal, CostumeCard } from '@/components';
import styles from './Product.module.scss';
import updateUserData from '../../api/updateData';

function Product() {
  const { user } = useGetUserInfo();
  const [formData, setFormData] = useState(() => JSON.parse(localStorage.getItem('weatherData')));
  const [clickedModal, setClickedModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { likeLocal, toggleLikeLocal } = useLikeStore();
  console.log('user', user);
  const toggleLike = (id) => {
    if (likeList.includes(id)) {
      setLikeList(likeList.filter((likeId) => likeId !== id)); // 좋아요 해제
    } else {
      setLikeList([...likeList, id]); // 좋아요 추가
    }
  };

  // 초기 현재 기온 상태
  const [temperature, setTemperature] = useState(() => ({
    current: '5°~8°',
  }));

  // 랜더링 시 전체 프로덕트 아이템을 받아옴
  const [productItems] = useState(() => JSON.parse(localStorage.getItem('costumeCards')));

  // 해당 상태 값 true, false에 따라서 아이템을 랜덤으로 리턴
  const [activeRandom, setActiveRandom] = useState(0);

  // 버튼 클릭시 해당 기온으로 temperature를 업데이트
  const handleClick = (e) => {
    const { innerText } = e.target;
    setActiveRandom((prev) => (prev = 0));
    setTemperature({ current: innerText });
  };

  // 파생된 상태, 기온에 맞게 상의 하의를 필터링
  const makeFilteredItem = (category) => {
    if (!productItems) return []; // productItems가 null이면 빈 배열 반환

    //기온과 카테고리에 맞게 1차 필터링
    const filteredItems = productItems.filter(
      ({ costumeTemperature: t, upperCategory }) =>
        upperCategory === category && t.includes(temperature.current)
    );

    // activeRandom이 ture면 아이템을 랜덤하게 리턴
    if (activeRandom) {
      return filteredItems.sort(() => 0.5 - Math.random()).slice(0, 2);
    }

    // activeRandom이 false라면 기본 배열의 index로 아이템을 리턴
    return filteredItems.slice(0, 2);
  };

  const filteredUpper = makeFilteredItem('상의');
  const filteredLower = makeFilteredItem('하의');

  // 새로고침 버튼 클릭 시 다음 아이템으로 새로고침
  const refreshProductItem = () => {
    setActiveRandom((prev) => prev + 1);
  };

  // 북마크 클릭 처리 함수
  const handleClickBookmark = () => {
    //로그인 상태가 아니라면 로그인 팝업이 보이게
    if (!user.isUser) return setModalOpen(true);

    //로그인 상태라면 북마크 팝업이 보이게
    setClickedModal(true);
  };

  // 북마크 textarea 입력 함수
  const handleChange = (value) => {
    setFormData((prev) => ({ ...prev, comment: value }));
  };

  // 북마크 저장 함수
  const handleSave = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const today = `${year}-${month}-${day}`;

    //기존 데이터에 옷 시간 uid 데이터를 추가
    const bookmarkItem = {
      ...formData,
      upperItems: filteredUpper,
      lowerItems: filteredLower,
      date: getDate(),
      saveTime: getDate(),
      uid: user.id,
      checkDate: today,
    };

    // 오늘 이전에 저장한 북마크 아이템 있는지 검사
    const checkItem = await getData('bookmarkItem', {
      filter: `checkDate = '${today}' && user = '${user.id}'`,
    }).then((result) => result[0]);

    // 오늘 저장했던 아이템이 있다면 해당 db 아이템을 업데이트 아니면 저장 진행
    if (checkItem) {
      const result = await updateUserData('bookmarkItem', checkItem.id, bookmarkItem);
      localStorage.setItem('bookmarkItem', JSON.stringify(result));
    } else {
      // bookmarkItem을 db서버에 저장
      const result = await createData(bookmarkItem);

      // 위에서 반환한 result 값을 로컬에 저장
      localStorage.setItem('bookmarkItem', JSON.stringify(result));
    }

    // db에 저장이 끝났다면 팝업이 사라지며 토스트가 호출
    setClickedModal(false);
    loadToast('북마크 저장 완료', '📌');
  };

  return (
    <div className={styles.product__component}>
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={['로그인 후', '이용해보세요!']}
        firstActionText="로그인"
        firstActionLink="/login"
        secondActionText="회원가입"
        secondActionLink="/register"
      />
      {clickedModal ? (
        <BookmarkModal
          address={formData.address}
          weatherText={formData.weatherText}
          onClick={() => setClickedModal(false)}
          onChange={handleChange}
          onEdit={handleSave}
        />
      ) : (
        ''
      )}
      <div className={styles.product__title__button}>
        <h2 className={styles.title}>오늘 날씨엔?</h2>
        <Button
          text="OOTD 저장"
          icon={<FaBookmark className={styles.icon} />}
          onClick={handleClickBookmark}
        />
      </div>
      <div className={styles.buttons}>
        {temperatureList.map((text, index) => (
          <Button style={BUTTONSTYLE} key={index} text={text} onClick={handleClick} />
        ))}
      </div>
      <div className={styles.recommend__container}>
        <img className={styles.icon} src="/image/notification.png" alt="notification" />
        <span className={styles.recommend}>반팔, 얇은 셔츠, 반바지, 면바지를 입으면 좋아요!</span>
      </div>
      <div className={styles.upper__section}>
        {filteredUpper.map((card) => (
          <CostumeCard
            key={card.id}
            record={card}
            imageUrl={getPbImageURL(card, 'costumeImage')}
            isLiked={likeLocal.includes(card.id)}
            onLikeToggle={() => toggleLikeLocal(card.id)}
          />
        ))}
      </div>
      <div className={styles.lower__section}>
        {filteredLower.map((card) => (
          <CostumeCard
            key={card.id}
            record={card}
            imageUrl={getPbImageURL(card, 'costumeImage')}
            isLiked={likeLocal.includes(card.id)}
            onLikeToggle={() => toggleLikeLocal(card.id)}
          />
        ))}
      </div>

      <div className={styles.buttonArea}>
        <Button
          style={{ marginTop: '30px' }}
          text="다른 스타일 추천해드릴까요?"
          onClick={refreshProductItem}
          activeAnimation={true}
          icon={<IoRefreshSharp />}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default Product;
