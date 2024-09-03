import React, { useId } from 'react';
import styles from './Input.module.scss';

function Input({
  text,
  description,
  type = 'text',
  value,
  onChange,
  buttonText,
  onButtonClick,
  onBlur,
  warningText,
  inputRef,
}) {
  const id = useId();

  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor={id}>
        {text}
        <span style={{ color: '#FFBC17' }}> *</span>
      </label>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={type}
          placeholder={description}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
          name={text === '이름' ? 'name' : 'email'}
          ref={inputRef} // ref 추가
        />
        {text === '이메일' && (
          <button className={styles.button} type="button" onClick={onButtonClick}>
            {buttonText ?? '확인'}
          </button>
        )}
        {warningText && <p className={styles.warningText}>{warningText}</p>}
      </div>
    </div>
  );
}

export default Input;
