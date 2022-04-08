import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type CreateStoryType = {
  receiver: string;
  image: { name: string; url: string; type: "MINI" | "SQUARE" | "WIDE" };
  keywords: string[];
  selectedKeywords: string[];
  waiting: number;
};

const initialState: CreateStoryType = {
  receiver: "",
  image: { name: "", url: "", type: "MINI" },
  keywords: [],
  selectedKeywords: [],
  waiting: 0,
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
        type: "MINI" | "SQUARE" | "WIDE";
      }>
    ) => {
      state.image = action.payload;
    },
    updateWaiting: (state, action: PayloadAction<number>) => {
      state.waiting = action.payload;
    },
    updateKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
    updateSelectedKeywords: (state, action: PayloadAction<string[]>) => {
      state.selectedKeywords = action.payload;
    },
  },
});

export const {
  updateReceiver,
  updateImage,
  updateWaiting,
  updateKeywords,
  updateSelectedKeywords,
} = CreateStorySlice.actions;

export const selectCreateStory = (state: RootState) => state.createStory;

export default CreateStorySlice.reducer;
