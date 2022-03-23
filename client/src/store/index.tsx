import { configureStore } from "@reduxjs/toolkit";
import createStoryReducer from "../store/createStory";

export const store = configureStore({
  reducer: {
    createStory: createStoryReducer,
  }, // 생성하게 될 redux state slice
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
