import { configureStore } from "@reduxjs/toolkit";
import userReducer from "store/user";

export const store = configureStore({
  reducer: { userReducer }, // 생성하게 될 redux state slice
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
