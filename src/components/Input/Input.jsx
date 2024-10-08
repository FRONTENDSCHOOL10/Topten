import { useId, useState } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';
import PropTypes, { string, func, bool, oneOf, oneOfType, object, element } from 'prop-types';
import { IoEyeSharp } from 'react-icons/io5';
import { BsFillEyeSlashFill } from 'react-icons/bs';

Input.propTypes = {
  text: string.isRequired, // 버튼 텍스트
  type: oneOf(['text', 'password', 'email', 'number']), // 입력 타입
  description: string, // 입력칸의 placeholder 텍스트
  value: string, // 입력칸의 값
  name: string, // 입력칸의 name 속성 값
  active: bool, // 버튼이 활성화된 상태인지 여부('이메일 인증 버튼')
  inputRef: object, // 입력칸 참조
  buttonText: string, // 버튼에 표시될 텍스트('이메일 인증 버튼')
  onChange: func, // 입력 값이 변경될 때 호출
  onBlur: func, // 입력칸에서 포커스가 벗어났을 때 호출
  onButtonClick: func, // 버튼 클릭 시 호출
  warningText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]), // 경고 문구
  warningStyle: object, // 경고 문구 스타일
  activeVisible: bool, // 비밀번호 표시 감춤 사용여부
};

function Input(props) {
  const [type, setType] = useState(() => 'password');
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    console.log('aa');
    if (visible) {
      setVisible(false);
      setType('password');
    } else {
      setVisible(true);
      setType('text');
    }
  };

  let visibleButton = null;
  const visibleText = visible ? '비밀번호 표시' : '비밀번호 숨김';
  if ((props.type === 'password' || props.type === 'text') && props.activeVisible) {
    visibleButton = (
      <button
        className={styles.visibleButton}
        aria-label={visibleText}
        title={visibleText}
        type="button"
        onClick={handleToggle}
      >
        {visible ? <IoEyeSharp /> : <BsFillEyeSlashFill />}
      </button>
    );
  }

  const id = useId();

  const inputClass = clsx({
    [styles.input]: true,
    [styles.inputWithButton]: props.text === '이메일' && props.active,
  });

  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor={id}>
        {props.text}
        <span style={{ color: '#FFBC17' }}> *</span>
      </label>

      <div className={styles.inputWrapper}>
        <div className={styles.inputWrapper2}>
          <input
            className={inputClass}
            type={props.activeVisible ? type : props.type || 'text'}
            placeholder={props.description}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            id={id}
            name={props.name ?? (props.text === '이름' ? 'name' : 'email')}
            ref={props.inputRef}
          />
          {props.warningText && (
            <p className={styles.warningText} style={props.warningStyle}>
              {props.warningText}
            </p>
          )}
        </div>
        {props.text === '이메일' && props.active && (
          <button className={styles.button} type="button" onClick={props.onButtonClick}>
            {props.buttonText ?? '확인'}
          </button>
        )}
        {visibleButton}
      </div>
    </div>
  );
}

export default Input;
