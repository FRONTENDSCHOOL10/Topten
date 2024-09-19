import { useEffect, useLayoutEffect, useRef, useMemo, useState } from 'react';
import { animate } from 'motion';
import S from './LoadingComment.module.scss';
import { string } from 'prop-types';

const LoadingComment = ({ text = '' }) => {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);
  const [animationStarted, setAnimationStarted] = useState(false);

  const letters = useMemo(() => Array.from(text).reverse(), [text]);

  // letters가 변경될 때 animationStarted를 초기화
  useEffect(() => {
    setAnimationStarted(false);
  }, [letters]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    // 모든 레퍼런스가 설정되었는지 확인
    if (!animationStarted && letterRefs.current.length === letters.length) {
      // 이전 애니메이션 중단
      letterRefs.current.forEach((element) => {
        if (element && element._animation) {
          element._animation.cancel();
        }
      });

      // 새로운 애니메이션 시작
      letterRefs.current.forEach((element, index) => {
        if (element) {
          const animation = animate(
            element,
            {
              transform: [
                `translateX(${-containerWidth * 0.1}px) rotate(180deg)`,
                `translateX(${containerWidth * 0.3}px) rotate(0deg)`,
                `translateX(${containerWidth * 0.7}px) rotate(0deg)`,
                `translateX(${containerWidth * 1.1}px) rotate(-180deg)`,
              ],
              opacity: [0, 1, 1, 0],
            },
            {
              duration: 3,
              delay: index * 0.2,
              repeat: Infinity,
              easing: 'linear',
            }
          );

          // 애니메이션 참조 저장
          element._animation = animation;
        }
      });

      // 애니메이션이 시작되었음을 표시
      setAnimationStarted(true);
    }

    // 컴포넌트 언마운트 또는 letters 변경 시 애니메이션 정리
    return () => {
      letterRefs.current.forEach((element) => {
        if (element && element._animation) {
          element._animation.cancel();
        }
      });
    };
  }, [letters, animationStarted]);

  return (
    <div className={S.load} ref={containerRef}>
      {letters.map((letter, index) => (
        <div
          key={`${letter}-${index}-${text}`}
          className={S.letter}
          ref={(el) => {
            letterRefs.current[index] = el;
          }}
          style={{
            position: 'absolute',
            left: 0,
            transform: 'translateX(0px) rotate(180deg)',
            opacity: 0,
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

LoadingComment.propTypes = {
  text: string,
};

export default LoadingComment;
