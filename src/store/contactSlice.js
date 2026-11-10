import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendContactRequest } from '../api/contactApi';

/** Статусы отправки формы */
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  fields: {
    name: '',
    email: '',
    message: '',
  },
  status: STATUS.IDLE,
  error: null,
  sentCount: 0,
};

/**
 * Асинхронное действие отправки заявки.
 * createAsyncThunk автоматически создаёт действия
 * contact/send/pending, contact/send/fulfilled и contact/send/rejected.
 */
export const sendRequest = createAsyncThunk('contact/send', async (fields, { rejectWithValue }) => {
  try {
    return await sendContactRequest(fields);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

/** Срез состояния формы обратной связи */
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // изменение поля формы: { field: 'email', value: '...' }
    fieldChanged(state, action) {
      const { field, value } = action.payload;
      state.fields[field] = value;
      // после ошибки пользователь исправляет данные — возвращаемся в исходный статус
      if (state.status === STATUS.ERROR) {
        state.status = STATUS.IDLE;
        state.error = null;
      }
    },
    // закрытие уведомления
    notificationDismissed(state) {
      if (state.status !== STATUS.LOADING) {
        state.status = STATUS.IDLE;
        state.error = null;
      }
    },
    // полный сброс формы
    formReset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendRequest.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(sendRequest.fulfilled, (state) => {
        state.status = STATUS.SUCCESS;
        state.fields = initialState.fields;
        state.sentCount += 1;
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.payload ?? 'Не удалось отправить заявку. Попробуйте ещё раз.';
      });
  },
});

export const { fieldChanged, notificationDismissed, formReset } = contactSlice.actions;

// Селекторы — функции чтения данных из store
export const selectContactFields = (state) => state.contact.fields;
export const selectContactStatus = (state) => state.contact.status;
export const selectContactError = (state) => state.contact.error;
export const selectSentCount = (state) => state.contact.sentCount;

export default contactSlice.reducer;
