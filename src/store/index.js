import { configureStore } from "@reduxjs/toolkit";
// import somethingReducer from "./somethingSlice"  // добавим позже
import cart from './cartSlice'

// configureStore — «собери мне Redux-хранилище».
// reducer:{} — карта всех редьюсеров (пока пусто).
export const store = configureStore({
    reducer: { cart } // теперь путь state.cart...
})