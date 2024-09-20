import { useMemo, useState } from 'react';
import useLikeStore from '@/stores/likeStore';
import { CostumeCardManager, Button } from '@/components';
import { temperatureList, categoryList } from '../data/constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';
import S from '@/styles/pages/LikedPage.module.scss';

const LikedPage = () => {
  // 로컬스토리지에서 costumeCards를 가져옴
  const costumeCards = JSON.parse(localStorage.getItem('costumeCards')) || [];

  // likeOrigin을 zustand에서 가져옴
  const { likeLocal } = useLikeStore();

  // 기온별 필터 상태 관리
  const [temperature, setTemperature] = useState('5°~8°');
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 상위 카테고리
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // 선택된 하위 카테고리

  // 날씨 필터 버튼 클릭 시 temperature 업데이트
  const handleTemperatureClick = (temp) => {
    setTemperature(temp);
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
    if (!selectedCategory && !selectedSubCategory) {
      return costumeCards.filter((card) => likeLocal.includes(card.id));
    }
    return costumeCards.filter(
      (card) =>
        likeLocal.includes(card.id) &&
        Array.isArray(card.costumeTemperature) &&
        card.costumeTemperature.includes(temperature) &&
        (card.upperCategory === selectedCategory || card.lowerCategory === selectedSubCategory)
    );
  }, [likeLocal, costumeCards, temperature, selectedCategory, selectedSubCategory]);

  return (
    <div className="wrapComponent">
      <div className={S.likedPage}>
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
          className={S.temperatureButtonsSwiper}
        >
          {temperatureList.map((temp, index) => (
            <SwiperSlide key={index}>
              <Button
                text={temp}
                style={{ width: '66px', height: '22px', fontSize: '12px', fontWeight: 400 }}
                onClick={() => handleTemperatureClick(temp)}
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
            <CostumeCardManager viewType="앨범" costumeCards={filteredLikeCards} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedPage;
