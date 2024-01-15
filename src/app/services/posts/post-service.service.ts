import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostResponse } from '../../interfaces/Post';
import { Observable } from 'rxjs';

type PostState = {
  allPosts: Post[];
};
type PState = {
  post: Post | any;
};
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

  loadPosts() {
    this.http
      .get<PostResponse>(this.url + 'posts/all')
      .subscribe((response) => {
        this.#postState.set({
          allPosts: response.data,
        });
      });
  }

  getPostById(id: string) {
    return this.http.get<PostResponse>(this.url + 'posts/' + id);
  }

  getReviewsByPostId(id: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.url + 'reviews/all/' + id);
  }
}
