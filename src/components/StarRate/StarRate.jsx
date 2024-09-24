import { useState, useEffect } from 'react';
import { func, number } from 'prop-types'; // prop-types 추가
import { FaStar, FaRegStar } from 'react-icons/fa';
import S from './StarRate.module.scss';

const StarRate = ({ onRate, initialRate = 0 }) => {
  const [starScore, setStarScore] = useState(initialRate);

  // 초기 starScore 값을 설정
  useEffect(() => {
    setStarScore(initialRate);
  }, [initialRate]);

  const ratingStarHandler = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <span
          key={i + 1}
          onClick={() => {
            setStarScore(i + 1);
            onRate(i + 1);
          }}
        >
          {i + 1 <= starScore ? <FaStar className={S.star} /> : <FaRegStar className={S.star} />}
        </span>
      );
    }
    return result;
  };

  return <div className={S.StarRate}>{ratingStarHandler()}</div>;
};

// prop-types로 타입 검사 추가
StarRate.propTypes = {
  onRate: func,
  initialRate: number,
};

export default StarRate;
