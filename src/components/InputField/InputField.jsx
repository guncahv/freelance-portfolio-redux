import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import styles from './InputField.module.css';

/**
 * Поле ввода (State: Default / Focused / Error).
 * В ЛР №22 значение поля хранится в глобальном store, поэтому компонент
 * стал управляемым: получает value и сообщает об изменениях через onValueChange.
 */
function InputField({
  id,
  label,
  value,
  onValueChange,
  placeholder = '',
  type = 'text',
  icon = null,
  helperText = '',
  error = '',
  multiline = false,
  disabled = false,
}) {
  const hintId = `${id}-hint`;
  const hint = error || helperText;
  const controlClass = [styles.control, multiline && styles.multiline, error && styles.error, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  const commonProps = {
    id,
    className: styles.input,
    value,
    placeholder,
    disabled,
    onChange: (event) => onValueChange(event.target.value),
    'aria-invalid': Boolean(error),
    'aria-describedby': hint ? hintId : undefined,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={controlClass}>
        {icon && <Icon src={icon} />}
        {multiline ? <textarea rows={4} {...commonProps} /> : <input type={type} {...commonProps} />}
      </div>
      {hint && (
        <span id={hintId} className={error ? `${styles.hint} ${styles.hintError}` : styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'tel']),
  icon: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default InputField;
