import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post, PostByIdResponse, PostResponse } from '../../interfaces/Post';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

type createPost = {
  title: string;
  body: string;
  authorId: string;
  image: string;
  tags: string;
};
@Injectable({
  providedIn: 'root',
})
export class PostService {
  url: string = environment.localUrl;
  token: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadPosts();
    this.token = authService.getToken();
  }

  loadPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'posts/all');
  }

  loadPostsByUserId(authorId: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'posts/author/' + authorId);
  }

  getPostById(id: string): Observable<PostByIdResponse> {
    return this.http.get<PostByIdResponse>(this.url + `posts/${id}`);
  }

  createPost(post: createPost): Observable<PostResponse> {
    const headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    };
    return this.http.post<PostResponse>(this.url + 'posts/create', post, {
      headers,
    });
  }

  likeOrDislikePost(postId: string, userId: string): Observable<PostResponse> {
    const headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    };

    return this.http.post<PostResponse>(
      this.url + `posts/${postId}/like/${userId}`,
      null,
      { headers }
    );
  }

  editPost(
    postId: string,
    post: Post,
    userId: string
  ): Observable<PostResponse> {
    const headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    };
    return this.http.put<PostResponse>(
      this.url + `posts/${postId}/update/${userId}`,
      post,
      { headers }
    );
  }

  deletePost(postId: string, userId: string): Observable<PostResponse> {
    const headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json',
    };
    return this.http.delete<PostResponse>(
      this.url + `posts/${postId}/delete/${userId}`,
      { headers }
    );
  }
}
