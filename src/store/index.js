import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';

/** Главное хранилище приложения */
export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});
