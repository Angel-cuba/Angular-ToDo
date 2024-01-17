import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostResponse } from '../../interfaces/Post';
import { Observable } from 'rxjs';

type PostState = {
  allPosts: Post[];
};
type createPost = {
  title: string;
  body: string;
  authorId: string;
  image: string;
  tags: string;
}
@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  url: string = environment.localUrl;

  #postState = signal<PostState>({ allPosts: [] });

  public posts = computed(() => this.#postState().allPosts);

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  loadPosts(): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'posts/all');
  }
  getPostById(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'posts/' + id);
  }

  getReviewsByPostId(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'reviews/all/' + id);
  }

  createPost(post: createPost): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.url + 'posts/create', post);
  }

  editPost(postId: string, post: Post, userId: string): Observable<PostResponse> {
    return this.http.put<PostResponse>(this.url + `posts/${postId}/update/${userId}`, post);
  }

  deletePost(postId: string, userId: string): Observable<PostResponse> {
    return this.http.delete<PostResponse>(this.url + `posts/${postId}/delete/${userId}`);
  }
}
