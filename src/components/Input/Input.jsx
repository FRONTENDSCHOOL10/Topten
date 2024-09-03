import React from 'react';
import styles from './Input.module.scss';
function Input(props) {
  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor="">
        {props.text} {props.mark ?? ''}
      </label>
      <input
        className={styles.input}
        type={props.type}
        placeholder={props.description}
      />
    </div>
  );
}

export default Input;
