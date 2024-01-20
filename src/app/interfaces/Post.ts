export interface Post {
  id?: string;
  title: string;
  body: string;
  authorId: string;
  image: string;
  likes?: string[];
  tags: string[];
  reviewIds?: ReviewIds[];
  createdAt?: string;
  updatedAt?: string;
}
export type ReviewIds = {
  id: string
  authorId: string;
  body: string;
  createdAt: string;
  updatedAt?: string;
};

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
