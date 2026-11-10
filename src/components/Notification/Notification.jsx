import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  STATUS,
  notificationDismissed,
  selectContactError,
  selectContactStatus,
} from '../../store/contactSlice';
import styles from './Notification.module.css';

/** Тексты уведомлений для каждого статуса отправки */
const MESSAGES = {
  [STATUS.LOADING]: { title: 'Отправляем заявку…', text: 'Подождите пару секунд.' },
  [STATUS.SUCCESS]: { title: 'Заявка отправлена!', text: 'Спасибо! Отвечу в течение рабочего дня.' },
  [STATUS.ERROR]: { title: 'Заявка не отправлена' },
};

const AUTO_HIDE_MS = 5000;

/**
 * Уведомление о статусе отправки заявки.
 * Подписано на статус в store и не связано с формой напрямую.
 */
function Notification() {
  const dispatch = useDispatch();
  const status = useSelector(selectContactStatus);
  const error = useSelector(selectContactError);

  // успешное уведомление скрывается автоматически
  useEffect(() => {
    if (status !== STATUS.SUCCESS) return undefined;
    const timer = setTimeout(() => dispatch(notificationDismissed()), AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [status, dispatch]);

  if (status === STATUS.IDLE) {
    return null;
  }

  const { title, text } = MESSAGES[status];

  return (
    <div
      className={`${styles.toast} ${styles[status]}`}
      role={status === STATUS.ERROR ? 'alert' : 'status'}
      aria-live="polite"
    >
      <span className={styles.marker} aria-hidden="true">
        {status === STATUS.LOADING && <span className={styles.spinner} />}
        {status === STATUS.SUCCESS && '✓'}
        {status === STATUS.ERROR && '!'}
      </span>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{status === STATUS.ERROR ? error : text}</p>
      </div>
      {status !== STATUS.LOADING && (
        <button
          type="button"
          className={styles.close}
          aria-label="Закрыть уведомление"
          onClick={() => dispatch(notificationDismissed())}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Notification;
