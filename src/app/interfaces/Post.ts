export interface Post {
    id: string;
    title: string;
    body: string;
    userId: string;
    image: string;
    likes: string[];
    tags: string[];
    reviewsIds: ReviewIds[];
    createdAt: string;
    updatedAt?: string;
}
type ReviewIds = {
    id: {
      timestamp: number;
      date: Date;
    }
    authorId: string;
    body: string;
    createdAt: string;
    updatedAt?: string;
}

export interface PostResponse {
    data: Post[];
    message: string;
    status: string;
}