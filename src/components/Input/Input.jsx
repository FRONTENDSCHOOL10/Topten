import React from 'react';
import styles from './Input.module.scss';

function Input(props) {
  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor="">
        {props.text}
        <span style={{ color: '#FFBC17' }}> *</span>
        {props.mark ?? ''}
      </label>
      <div className={styles.inputWrapper}>
        <input className={styles.input} type={props.type} placeholder={props.description} />
        {props.text === '이메일' && (
          <button className={styles.button} onClick={props.onButtonClick}>
            {props.buttonText ?? '확인'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
