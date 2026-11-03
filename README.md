# aykhan.dev — портфолио фриланс-разработчика (React + Redux Toolkit)

Лабораторная работа №22 «Внедрение глобального управления состоянием в React-приложение с использованием Redux или Zustand».
Вариант 1 — «Портфолио фриланс-разработчика». Выбранный стейт-менеджер — **Redux Toolkit** (вариант A).

Выполнил: Рахманкулов А., группа 310101.

## Стек

- React 19 + Vite
- Redux Toolkit (`createSlice`, `createAsyncThunk`, `configureStore`) и React Redux (`Provider`, `useSelector`, `useDispatch`)
- CSS Modules, дизайн-токены ЛР №17

## Запуск проекта

Требуется установленный [Node.js](https://nodejs.org/) (версия 20.19 или новее).

```bash
git clone https://github.com/guncahv/freelance-portfolio-redux.git
cd freelance-portfolio-redux
npm install
npm run dev
```

После запуска откройте в браузере адрес из терминала (обычно http://localhost:5173).

Пакеты Redux устанавливались командой:

```bash
npm install @reduxjs/toolkit react-redux
```

## Глобальное хранилище

```
src/
├── api/contactApi.js        # имитация сервера приёма заявок
├── store/
│   ├── index.js             # configureStore — главное хранилище
│   └── contactSlice.js      # срез формы обратной связи: состояние, редюсеры, thunk, селекторы
└── components/
    ├── ContactForm/         # форма заявки: useSelector + useDispatch
    └── Notification/        # уведомление: подписано на статус через useSelector
```

Состояние среза `contact`:

| Поле | Описание |
|---|---|
| `fields` | значения полей формы: `name`, `email`, `message` |
| `status` | статус отправки: `'idle'`, `'loading'`, `'success'`, `'error'` |
| `error` | текст ошибки сервера |
| `sentCount` | число успешно отправленных заявок |

Действия:

| Действие | Кто отправляет | Что меняет |
|---|---|---|
| `contact/fieldChanged` | ContactForm (ввод в поле) | значение поля; после ошибки — статус `idle` |
| `contact/send/pending` | thunk `sendRequest` | `status = 'loading'` |
| `contact/send/fulfilled` | thunk `sendRequest` | `status = 'success'`, очистка полей, `sentCount + 1` |
| `contact/send/rejected` | thunk `sendRequest` | `status = 'error'`, текст ошибки |
| `contact/notificationDismissed` | Notification (крестик / таймер) | `status = 'idle'` |
| `contact/formReset` | — | сброс среза к начальному состоянию |

Форма и уведомление не связаны друг с другом напрямую: форма только отправляет действия, а уведомление только читает статус из store.

## Как проверить

1. Заполните форму «Обсудим ваш проект?» с некорректным email и нажмите «Отправить заявку» — через 1,5 с появится уведомление об ошибке.
2. Исправьте email, опишите задачу (не менее 10 символов) и отправьте снова — во время отправки поля заблокированы, затем появится уведомление об успехе.
