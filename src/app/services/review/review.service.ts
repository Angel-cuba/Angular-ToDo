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
  data: Review;
  message: string;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url: string = environment.localUrl;

  constructor(private http: HttpClient) {}

  getReviewsByPostId(postId: string): Observable<ReviewInterfaceResponse> {
    return this.http.get<ReviewInterfaceResponse>(
      this.url + `reviews/all/${postId}`
    );
  }


  createReview(postId: string, review: Review, token: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.http.post<ReviewResponse>(
      this.url + `reviews/create/review/${postId}`,
      review,
      { headers }
    );
  }

  getReviewById(reviewId: string, token: string): Observable<ReviewResponse>  {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.http.get<ReviewResponse>(this.url + `reviews/review/${reviewId}`, { headers });
  }

  editReview(postId: string, reviewId: string, userId: string, review: Review, token: string): Observable<ReviewResponse> {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.http.put<ReviewResponse>(
      this.url + `reviews/${postId}/update/${reviewId}/${userId}`,
      review,
      { headers }
    );
  }

  deleteReview(postId: string, reviewId: string, userId: string, token: string): Observable<ReviewResponse>{
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
    return this.http.delete<ReviewResponse>(
      this.url + `reviews/${postId}/delete/${reviewId}/${userId}`, { headers }
    );
  }
}
