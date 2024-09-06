import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.scss';

function Button(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.to) {
      navigate(props.to);
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {props.text || ''}
    </button>
  );
}

export default Button;
