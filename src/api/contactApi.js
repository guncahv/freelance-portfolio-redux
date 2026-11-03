// Имитация сервера приёма заявок (задержка сети + проверка данных на «сервере»)
const NETWORK_DELAY = 1500;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sendContactRequest({ name, email, message }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!EMAIL_PATTERN.test(email)) {
        reject(new Error('Сервер отклонил заявку: укажите корректный email, например name@example.com.'));
        return;
      }
      if (message.trim().length < 10) {
        reject(new Error('Сервер отклонил заявку: опишите задачу подробнее (не менее 10 символов).'));
        return;
      }
      resolve({ id: Date.now(), name, email, receivedAt: new Date().toISOString() });
    }, NETWORK_DELAY);
  });
}
