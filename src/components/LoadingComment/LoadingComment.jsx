// src/components/LoadingComment.jsx

import { useEffect, useRef, useMemo } from 'react';
import { animate } from 'motion';
import styles from './LoadingComment.module.scss';

const LoadingComment = ({ text = '' }) => {
  const containerRef = useRef(null);
  const letterRefs = useRef([]);

  const letters = useMemo(() => Array.from(text).reverse(), [text]);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    letterRefs.current.forEach((element, index) => {
      animate(
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
    });
  }, [letters]);

  return (
    <div className={styles.load} ref={containerRef}>
      {letters.map((letter, index) => (
        <div
          key={index}
          className={styles.letter}
          ref={(el) => (letterRefs.current[index] = el)}
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

export default LoadingComment;
