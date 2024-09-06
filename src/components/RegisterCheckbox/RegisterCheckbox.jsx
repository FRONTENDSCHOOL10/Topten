import styles from './RegisterCheckbox.module.scss';

function RegisterCheckbox({ id, text, onChange, checked }) {
  return (
    <div className={styles.checkbox__container}>
      <div>
        <input type="checkbox" id={id} checked={checked} onChange={() => onChange?.()} />
        <label htmlFor={id}>{text}</label>
      </div>
      <span>
        약관 보기 <img className={styles.chevron__right} src="./icon/right.svg" alt="chevron" />
      </span>
    </div>
  );
}

export default RegisterCheckbox;
