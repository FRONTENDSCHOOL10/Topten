import { forwardRef } from 'react';
import { string, arrayOf, func } from 'prop-types';
import styles from './Select.module.scss';

const Select = forwardRef(({ label, items, value, onChange }, ref) => {
  return (
    <div className={styles.selectComponent}>
      <label className={styles.label} htmlFor="select">
        {label}
      </label>
      <select className={styles.select} id="select" ref={ref} value={value} onChange={onChange}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  label: string.isRequired, // label 텍스트 (필수)
  items: arrayOf(string).isRequired, // 옵션 배열 (필수)
  value: string.isRequired, // 선택된 값 (필수, 제어된 컴포넌트)
  onChange: func.isRequired, // 값이 변경될 때 호출되는 함수 (필수)
};

export default Select;

/*
사용예시

import { useState, useRef } from 'react';
import Select from './Select';

function App() {
  const [selectedSize, setSelectedSize] = useState('s');
  const selectRef = useRef(null);

  const handleChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div>
      <Select
        label="사이즈 선택"
        items={['xs', 's', 'm', 'l']}
        value={selectedSize}
        onChange={handleChange}
        ref={selectRef}
      />
      <button onClick={() => console.log(selectRef.current.value)}>현재 선택된 값</button>
    </div>
  );
}

export default App;

*/
