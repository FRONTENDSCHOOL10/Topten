import { string, oneOf } from 'prop-types';
import styles from './Button.module.scss';

function Button({ text = 'Button', type = 'button', disabled = false, onClick }) {
  return (
    <button className={styles.button} type={type} disabled={disabled} onClick={(e) => onClick?.(e)}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: string,
  type: oneOf(['button', 'submit', 'reset']),
};

export default Button;
