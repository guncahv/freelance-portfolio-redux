import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import {
  STATUS,
  fieldChanged,
  sendRequest,
  selectContactFields,
  selectContactStatus,
  selectSentCount,
} from '../../store/contactSlice';
import sendIcon from '../../assets/icon-arrow-right.svg';
import mailIcon from '../../assets/icon-contact.svg';
import styles from './ContactForm.module.css';

/**
 * Форма отправки заявки.
 * Читает поля и статус из store (useSelector) и отправляет действия (useDispatch).
 * Собственного состояния у формы нет.
 */
function ContactForm() {
  const dispatch = useDispatch();
  const fields = useSelector(selectContactFields);
  const status = useSelector(selectContactStatus);
  const sentCount = useSelector(selectSentCount);

  const isLoading = status === STATUS.LOADING;

  const handleChange = (field) => (value) => {
    dispatch(fieldChanged({ field, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendRequest(fields));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
      <div className={styles.row}>
        <InputField
          id="name"
          label="Ваше имя"
          placeholder="Как к вам обращаться"
          value={fields.name}
          onValueChange={handleChange('name')}
          disabled={isLoading}
        />
        <InputField
          id="email"
          type="email"
          label="Email для связи"
          placeholder="name@example.com"
          icon={mailIcon}
          value={fields.email}
          onValueChange={handleChange('email')}
          disabled={isLoading}
        />
      </div>
      <InputField
        id="message"
        label="Задача"
        placeholder="Опишите проект: что нужно сделать и в какие сроки"
        helperText="Отвечу в течение рабочего дня"
        multiline
        value={fields.message}
        onValueChange={handleChange('message')}
        disabled={isLoading}
      />
      <div className={styles.actions}>
        <Button
          type="submit"
          label={isLoading ? 'Отправка…' : 'Отправить заявку'}
          icon={isLoading ? null : sendIcon}
          disabled={isLoading}
        />
        {sentCount > 0 && <span className={styles.counter}>Отправлено заявок: {sentCount}</span>}
      </div>
    </form>
  );
}

export default ContactForm;
