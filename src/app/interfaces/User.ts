export type User = {
  email: string;
  password: string;
};

export interface newUser {
  username: string;
  password: string;
  email: string;
  image: string;
  linkedin: string;
  github: string;
  bio: string;
}

export interface UserLocalStorage {
  token: string;
  user: UserData;
  isLoggedIn?: false;
}

type UserData = {
  role: string;
  username: string;
  image: string;
};

export interface UserFromDB extends newUser {
  id: string;
  role: string;
}

export interface UserDbResponse {
  data: UserFromDB;
  message: string;
  status: string;
}