import { useId } from 'react';
import { string, oneOf } from 'prop-types';
import styles from './Input.module.scss';

function Input({ text, type = 'text', description = '', mark = '' }) {
  const id = useId();

  return (
    <div className={styles.inputComponent}>
      <label className={styles.label} htmlFor={id}>
        {text}
        <span style={{ color: '#FFBC17' }}> *</span>
        {mark}
      </label>
      <input className={styles.input} id={id} type={type} placeholder={description} />
    </div>
  );
}

Input.propTypes = {
  text: string.isRequired,
  type: oneOf(['text', 'password', 'email', 'number']),
  description: string,
  mark: string,
};

export default Input;

/*
사용예시
import { useState, useRef } from 'react';
import Input from './Input';

function App() {
  // 상태를 이용해 입력값을 제어하는 제어 컴포넌트
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null); // ref를 사용해 input 요소를 직접 참조

  // 입력값이 변경될 때 호출되는 핸들러
  const handleChange = (e) => {
    setInputValue(e.target.value); // 상태 업데이트
  };

  return (
    <div>
      <Input
        text="이름"
        type="text"
        description="이름을 입력하세요"
        value={inputValue}
        onChange={handleChange} // 입력값이 변경될 때 호출
        ref={inputRef} // ref를 통해 input 요소 참조
      />
      <button onClick={() => console.log(inputRef.current.value)}>
        입력된 값 확인
      </button>
    </div>
  );
}

export default App;


text="이름": label에 표시될 텍스트.
type="text": 입력 필드의 타입을 text로 설정.
description="이름을 입력하세요": 입력 필드의 placeholder.
value={inputValue}: 제어된 컴포넌트로 value를 상태로 연결.
onChange={handleChange}: 입력값이 변경될 때 호출되는 함수.
ref={inputRef}: <input> 요소에 직접 접근하기 위한 참조를 설정.
 */
