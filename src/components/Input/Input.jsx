import React, { useId } from 'react';
import styles from './Input.module.scss';

function Input(props) {
  const inputId = useId();  // 고유한 ID 생성

  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor={inputId}>
        {props.text}
        <span style={{ color: '#FFBC17' }}> *</span>
        {props.mark ?? ''}
      </label>
      <input
        id={inputId}  // 자동 생성된 id 사용
        className={styles.input}
        type={props.type}
        placeholder={props.description}
        onChange={props.onChange}
      />
      <span className={styles.errorMessage}>{props.errorMessage}</span>
      <span className={styles.approveMessage}>{props.approveMessage}</span>
    </div>
  );
}

export default Input;