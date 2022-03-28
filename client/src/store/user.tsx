import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { UserState } from "types/user";

const initialState: UserState = {
  userId: -1,
  email: "",
  password: "",
  nickname: "",
  profilePic: -1,
  location: "",
  reportCnt: -1,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<UserState>) => {
      return (state = { ...action.payload, isLogged: true });
    },
  },
});

export const { setLoggedUser } = userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
