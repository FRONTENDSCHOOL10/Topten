import React from 'react';
import styles from './Button.module.scss';
function Button(props) {
  return <button className={styles.button}>{props.text || ''}</button>;
}

export default Button;