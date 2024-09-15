import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import S from './/StarRate.module.scss';
const StarRate = () => {
  const [starScore, setStarScore] = useState(0);

  const ratingStarHandler = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <span key={i + 1} onClick={() => setStarScore(i + 1)}>
          {i + 1 <= starScore ? <FaStar className={S.star} /> : <FaRegStar className={S.star} />}
        </span>
      );
    }
    return result;
  };

  return <div className={S.StarRate}>{ratingStarHandler()}</div>;
};

export default StarRate;
