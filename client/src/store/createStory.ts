import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type CreateStoryType = {
  receiver: string;
  image: { name: string; url: string; type: "mini" | "square" | "wide" };
  selectedKeyword: string[];
  waiting: string;
};

const initialState: CreateStoryType = {
  receiver: "",
  image: { name: "", url: "", type: "square" },
  selectedKeyword: [],
  waiting: "",
};

export const CreateStorySlice = createSlice({
  name: "createStory",
  initialState,
  reducers: {
    updateReceiver: (state, action: PayloadAction<string>) => {
      state.receiver = action.payload;
    },
    updateImage: (
      state,
      action: PayloadAction<{
        name: string;
        url: string;
        type: "mini" | "square" | "wide";
      }>
    ) => {
      state.image = action.payload;
    },
    updateWaiting: (state, action: PayloadAction<string>) => {
      state.waiting = action.payload;
    },
    updateSelectedKeyword: (state, action: PayloadAction<string[]>) => {
      state.selectedKeyword = action.payload;
    },
  },
});

export const {
  updateReceiver,
  updateImage,
  updateWaiting,
  updateSelectedKeyword,
} = CreateStorySlice.actions;

export const selectCreateStory = (state: RootState) => state.createStory;

export default CreateStorySlice.reducer;
