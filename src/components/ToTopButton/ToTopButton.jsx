import { useState, useEffect } from 'react';
import { animate } from 'motion';
import { GoArrowUp } from 'react-icons/go';
import S from './ToTopButton.module.scss';

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 300 && !isVisible) {
      setIsVisible(true);
    } else if (scrollPosition <= 300 && isVisible) {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    const button = document.querySelector(`.${S.toTopButton}`);

    if (isVisible) {
      button.classList.add(S.visible);
      animate(button, { opacity: 1 }, { duration: 0.3 });
    } else {
      animate(button, { opacity: 0 }, { duration: 0.3 }).finished.then(() => {
        button.classList.remove(S.visible);
      });
    }
  }, [isVisible]);

  return (
    <button className={`${S.toTopButton}`} onClick={scrollToTop}>
      <GoArrowUp />
    </button>
  );
};

export default ToTopButton;
