import { string, oneOf } from 'prop-types';
import styles from './Button.module.scss';

function Button({ text = 'Button', type = 'button' }) {
  return (
    <button className={styles.button} type={type}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: string,
  type: oneOf(['button', 'submit', 'reset']),
};

export default Button;
