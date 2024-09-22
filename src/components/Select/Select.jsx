import { useId } from 'react';
import styles from './Select.module.scss';
import { string, arrayOf, func, bool, any } from 'prop-types';

export default function Select({
  name,
  text = '',
  items,
  onChange,
  toChangeInfo = false,
  current,
}) {
  const id = useId();
  return (
    <div className={styles.select__container}>
      <label htmlFor={id}>{text}</label>
      <select id={id} className={styles.select} name={name} onChange={(e) => onChange?.(e)}>
        {toChangeInfo ? <option value={current}>{current}</option> : ''}
        {items.map((item, index) =>
          item === current ? (
            ''
          ) : (
            <option key={index} value={item}>
              {item}
            </option>
          )
        )}
      </select>
    </div>
  );
}

Select.propTypes = {
  name: string.isRequired, // select 태그 name / 필
  text: string, // label 태그 value
  items: arrayOf(string).isRequired, // option 태그에 사용 배열 / 필
  onChange: func,
  toChangeInfo: bool,
  current: any,
};

// 예시
//  <Select name="bottomSize" text="하의 사이즈" items={SIZE} onChange={handleChange} />
