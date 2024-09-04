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
  warningStyle,
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
        <div className={styles.inputWrapper2}>
          <input
            className={styles.input}
            type={type}
            placeholder={description}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            name={text === '이름' ? 'name' : 'email'}
            ref={inputRef}
          />
          {warningText && (
            <p className={styles.warningText} style={warningStyle}>
              {warningText}
            </p>
          )}
        </div>
        {text === '이메일' && (
          <button className={styles.button} type="button" onClick={onButtonClick}>
            {buttonText ?? '확인'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
