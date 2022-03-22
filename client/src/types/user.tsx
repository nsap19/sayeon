type UserType = {
  userId: number;
  email: string;
  password: string;
  nickname: string;
  profilePic: number;
  location: string;
  reportCnt: number;
};

export type UserState = UserType & { isLogged: boolean };
