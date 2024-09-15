import { useState, useEffect } from 'react';

import { CostumeCardManager } from '@/components';
import S from './Bookmark.module.scss';
import StarRate from '../StarRate/StarRate';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { getWeatherIcon } from '../../utils/weatherIcons';
//import deleteData from '../../api/deleteData';
//import updateUserData from '../../api/updateData';

const Bookmark = () => {
  //   const bookmarkData = JSON.parse(localStorage.getItem('bookmarkItem'));

  // const { address, skyCondition, comment, rate, saveTime, upperItems, lowerItems } = bookmarkData;

  const savedAddress = localStorage.getItem('address');
  const savedTime = localStorage.getItem('lastAccessTime').slice(0, 10);
  const skyCondition = localStorage.getItem('skyCondition');

  const [costumeCards, setCostumeCards] = useState([]);
  // CostumeCard 리스트를 서버에서 불러와 sessionStorage와 localStorage에 저장
  useEffect(() => {
    const fetchCostumeCards = async () => {
      try {
        // 세션에 저장된 costumeCards를 가져옴
        const cachedCostumeCards = sessionStorage.getItem('costumeCards');

        // 세션에 데이터가 존재하고, 빈 배열이 아닌 경우 상태에 저장
        if (cachedCostumeCards && JSON.parse(cachedCostumeCards).length > 0) {
          const temp = JSON.parse(cachedCostumeCards);
          console.log('temp:', temp.slice(0, 4));
          //   setCostumeCards(JSON.parse(cachedCostumeCards));
          setCostumeCards(temp.slice(0, 4));
        }
        // 세션에 데이터가 없거나 빈 배열일 경우 서버에서 데이터를 가져옴
        else {
          const records = await pb.collection('costumeCard').getFullList({
            sort: '-created',
          });

          // 가져온 데이터를 상태에 저장하고, 로컬 및 세션에 저장
          setCostumeCards(records);
          sessionStorage.setItem('costumeCards', JSON.stringify(records));
          localStorage.setItem('costumeCards', JSON.stringify(records));
        }
      } catch (error) {
        console.error('Failed to fetch costumeCards:', error);
      }
    };

    fetchCostumeCards();
  }, []);

  const handleEdit = () => {
    console.log('handleEdit');
    //const res = updateUserData('bookmarkItem', '아이템 id', '새로운 객체');
  };
  const handleDelete = () => {
    console.log('handleDelete');
    //const res = deleteData('bookmarkItem', '아이템 id'); 삭제 성공 시 res에 true가 할당
  };

  return (
    <>
      <div className={S.centering}>
        <span className={S.title}>나의 북마크</span>
        <div className={S.upperPart}>
          <div className={S.DateLocation}>
            <p>{savedTime}</p>
            <p>{savedAddress}</p>
            <div className={S.weather}>
              <img
                src={getWeatherIcon(skyCondition).src}
                alt={getWeatherIcon(skyCondition).alt}
                className={S.weatherIcon}
              />
              {skyCondition}
            </div>
          </div>
          <div className={S.iconWrapper}>
            <button type="button" className={S.icon} onClick={handleEdit}>
              <FaRegEdit />
            </button>
            <button type="button" className={S.icon} onClick={handleDelete}>
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>

        <span className={S.OOTD}>추천 OOTD</span>
        <CostumeCardManager viewType="OOTD" costumeCards={costumeCards} />
        <div className={S.comment}>
          <div className={S.comment__Part}>
            <label htmlFor="comment">Comment</label>
            <StarRate />
          </div>
          <input type="text" id="comment" className={S.comment__Content} />
          <p align="right">저장 날짜</p>
        </div>
      </div>
    </>
  );
};

export default Bookmark;
