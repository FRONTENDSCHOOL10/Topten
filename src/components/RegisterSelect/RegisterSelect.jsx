import styles from './RegisterSelect.module.scss';

function RegisterSelect({ name, text = '', items, onChange }) {
  return (
    <div className={styles.select__container}>
      <label htmlFor={name}>{text}</label>
      <select id={name} className={styles.select} name={name} onChange={(e) => onChange?.(e)}>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegisterSelect;
