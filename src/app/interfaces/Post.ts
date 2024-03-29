import { Review } from "./Reviews";

export interface Post {
  id?: string;
  title: string;
  body: string;
  authorId?: string;
  image: string;
  likes?: string[];
  tags: string[];
  reviewIds?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PostResponse {
  data: Post[];
  message: string;
  status: string;
}

export interface PostByIdResponse {
  data: {
    title: string;
    body: string;
    image: string;
    tags: string[];
  };
  message: string;
  status: string;
}
