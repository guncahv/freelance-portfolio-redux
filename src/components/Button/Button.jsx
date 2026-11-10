import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './Button.module.css';

/**
 * Кнопка дизайн-системы (Type: Primary / Secondary).
 * Текст, иконка, вариант и обработчик клика передаются через props.
 */
function Button({ label, onClick, variant = 'primary', icon = null, type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
      {icon && <Icon src={icon} />}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

export default Button;
