import React from 'react';
import styles from './Select.module.scss';
function Select(props) {
  //const array = ['xs', 's', 'l'];

  return (
    <select className={styles.select}>
      {props.items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default Select;
