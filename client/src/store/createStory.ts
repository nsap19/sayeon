import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

export type CreateStoryType = {
  receiver: string;
  image: { name: string; url: string; type: "mini" | "square" | "wide" };
  keywords: string[];
  selectedKeywords: string[];
  waiting: string;
};

const initialState: CreateStoryType = {
  receiver: "",
  image: { name: "", url: "", type: "square" },
  keywords: [],
  selectedKeywords: [],
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
