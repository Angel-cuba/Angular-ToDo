export interface Review {
  id?: string
  authorId: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface ReviewInterfaceResponse {
  data: Review[];
  message: string;
  status: string;
}