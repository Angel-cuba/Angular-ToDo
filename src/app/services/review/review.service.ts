import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ReviewInterfaceResponse } from '../../interfaces/Reviews';

type Review = {
  body: string;
  authorId: string;
};
interface ReviewResponse {
  data: string;
  message: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url: string = environment.localUrl;

  constructor(private http: HttpClient) {}

  getReviewsByPostId(id: string): Observable<ReviewInterfaceResponse> {
    return this.http.get<ReviewInterfaceResponse>(
      this.url + `reviews/all/${id}`
    );
  }

  createReview(postId: string, review: Review) {
    return this.http.post<ReviewResponse>(
      this.url + `reviews/create/${postId}`,
      review
    );
  }

  getReviewById(id: string) {
    return this.http.get<ReviewResponse>(this.url + `reviews/review/${id}`);
  }

  editReview(postId: string, reviewId: string, userId: string, review: Review) {
    return this.http.put<ReviewResponse>(
      this.url + `reviews/${postId}/update/${reviewId}/${userId}`,
      review
    );
  }

  deleteReview(postId: string, reviewId: string, userId: string) {
    return this.http.delete<ReviewResponse>(
      this.url + `reviews/${postId}/delete/${reviewId}/${userId}`
    );
  }
}
