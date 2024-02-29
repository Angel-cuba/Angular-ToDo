export interface LoginResponse {
  data: Data
  message: string
  status: string
}

type Data = {
  token: string,
  user: {
    role: string,
    username: string,
    image: string
  }
}

export type User = {
  email: string;
  password: string;
}

export interface newUser {
  username: string;
  password: string;
  email: string;
  image: string;
  linkedin: string;
  github: string;
  bio: string;
}