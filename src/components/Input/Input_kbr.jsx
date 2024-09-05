import React, { useId } from 'react';
import styles from './Input.module.scss';

function Input(props) {
  const id = useId();

  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor={id}>
        {props.text}
        <span style={{ color: '#FFBC17' }}> *</span>
      </label>

      <div className={styles.inputWrapper}>
        <div className={styles.inputWrapper2}>
          <input
            className={styles.input}
            type={props.type || 'text'}
            placeholder={props.description}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            id={id}
            name={props.text === '이름' ? 'name' : 'email'}
            ref={props.inputRef}
          />
          {props.warningText && (
            <p className={styles.warningText} style={props.warningStyle}>
              {props.warningText}
            </p>
          )}
        </div>
        {props.text === '이메일' && (
          <button className={styles.button} type="button" onClick={props.onButtonClick}>
            {props.buttonText ?? '확인'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
