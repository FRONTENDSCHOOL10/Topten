import { useMemo, useState, useEffect } from 'react';
import { CostumeCardManager, Button, CommonModal } from '@/components';
import { temperatureList, categoryList } from '../data/constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import clsx from 'clsx';
import S from '@/styles/pages/LikedPage.module.scss';
import useUserStore from '@/stores/userStore';
import useLikeStore from '@/stores/likeStore';

const LikedPage = () => {
  // 로그인 확인 부분
  const { isLoggedIn, initUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(true);

  // 로컬스토리지에서 costumeCards를 가져옴
  const costumeCards = useMemo(() => {
    return JSON.parse(localStorage.getItem('costumeCards')) || [];
  }, []);

  // likelocal을 zustand에서 가져옴
  const { likeLocal, toggleLikeLocal } = useLikeStore();

  // 기온별 필터 상태 관리
  const [temperature, setTemperature] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 상위 카테고리
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // 선택된 하위 카테고리

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cardToToggle, setCardToToggle] = useState(null);

  // 날씨 필터 버튼 클릭 시 temperature 업데이트
  const handleTemperatureClick = (temp) => {
    if (temperature === temp) {
      setTemperature(''); // 선택 해제
    } else {
      setTemperature(temp); // 새로운 온도 선택
    }
  };

  // 카테고리 버튼 클릭 시 category 업데이트
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(null); // 상위 카테고리 선택 시 하위 카테고리 초기화
  };

  const handleSubCategoryClick = (subCat) => {
    setSelectedSubCategory(subCat);
    setSelectedCategory(null); // 하위 카테고리 선택 시 상위 카테고리 초기화
  };

  // likeLocal에 포함된 의상 카드를 필터링하여 관리
  const filteredLikeCards = useMemo(() => {
    let filteredCards = costumeCards.filter((card) => likeLocal.includes(card.id));

    if (temperature) {
      filteredCards = filteredCards.filter(
        (card) =>
          Array.isArray(card.costumeTemperature) && card.costumeTemperature.includes(temperature)
      );
    }

    if (selectedCategory) {
      filteredCards = filteredCards.filter((card) => card.upperCategory === selectedCategory);
    }

    if (selectedSubCategory) {
      filteredCards = filteredCards.filter((card) => card.lowerCategory === selectedSubCategory);
    }

    return filteredCards;
  }, [likeLocal, costumeCards, temperature, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isLoggedIn]);

  // 좋아요 버튼 클릭 시 모달을 여는 함수
  const handleLikeToggle = (cardId) => {
    setCardToToggle(cardId);
    setIsConfirmModalOpen(true);
  };

  // 모달에서 확인 버튼을 눌렀을 때 호출되는 함수
  const confirmToggleLike = () => {
    if (cardToToggle) {
      toggleLikeLocal(cardToToggle);
      setCardToToggle(null);
      setIsConfirmModalOpen(false);
    }
  };

  // 모달에서 취소 버튼을 눌렀을 때 호출되는 함수
  const cancelToggleLike = () => {
    setCardToToggle(null);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="wrapComponent">
      <div className={S.likedPage}>
        {!isLoggedIn && (
          <CommonModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={['로그인 후', '이용해보세요!']}
            firstActionText="로그인"
            firstActionLink="/login"
            secondActionText="회원가입"
            secondActionLink="/register"
          />
        )}

        <div className={S.title}>
          <img src="/image/icon-like.png" alt="좋아요 페이지 아이콘" className={S.likeIcon} />
          <h2>좋아요</h2>
          <p>{likeLocal.length}</p>
        </div>
        <hr className={S.line} />
        {/* 기온별 버튼 리스트 */}
        <Swiper
          spaceBetween={10}
          slidesPerView={4} // 한 번에 4개의 버튼을 보여줌
          mousewheel={true}
          modules={[Mousewheel]}
          className={S.temperatureButtonsSwiper}
        >
          {temperatureList.map((temp, index) => (
            <SwiperSlide key={index}>
              <Button
                text={temp}
                TemperButton={true}
                onClick={() => handleTemperatureClick(temp)}
                active={temp === temperature}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={S.album}>
          {/* 왼쪽 카테고리 버튼 리스트 */}
          <div className={S.categoryButtons}>
            {/* 상위 카테고리 렌더링 */}
            {Object.entries(categoryList).map(([cat, subCats], index) => (
              <div key={index}>
                {/* 상위 카테고리 버튼 */}
                <div
                  className={clsx(S.categoryButton, S.upperCategory, {
                    [S.active]: selectedCategory === cat && !selectedSubCategory,
                  })}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </div>

                {/* 하위 카테고리 렌더링 */}
                {subCats.length > 0 && (
                  <div className={S.subCategories}>
                    {subCats.map((subCat, idx) => (
                      <div
                        key={idx}
                        className={clsx(S.categoryButton, S.lowerCategory, {
                          [S.active]: selectedSubCategory === subCat,
                        })}
                        onClick={() => handleSubCategoryClick(subCat)}
                      >
                        {subCat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* CostumeCardManager를 사용한 좋아요한 카드 리스트 표시 */}
          <div className={S.ccmWrapper}>
            <CostumeCardManager
              viewType="앨범"
              costumeCards={filteredLikeCards}
              onLikeToggle={handleLikeToggle}
            />
          </div>
        </div>

        {/* 좋아요 취소 확인 모달 */}
        <CommonModal
          isOpen={isConfirmModalOpen}
          onClose={cancelToggleLike}
          title={['북마크를', '삭제하시겠습니까?']}
          firstActionText="앗 실수!"
          secondActionText="삭제할래요"
          onFirstAction={cancelToggleLike}
          onSecondAction={confirmToggleLike}
        />
      </div>
    </div>
  );
};

export default LikedPage;
