import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post, PostResponse } from '../../interfaces/Post';

type PostState = {
  allPosts: Post[];
};
type PState = {
  post: Post[] | any;
};
@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  url: string = environment.localUrl;

  #postState = signal<PostState>({ allPosts: [] });
  #postState$ = signal<PState>({ post: [] });


  public posts = computed(() => this.#postState().allPosts);
  public post = computed(() => this.#postState$().post);

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
    this.http
      .get<PostResponse>(this.url + 'posts/' + id)
      .subscribe((response) => {
        this.#postState$.set({
          post: response.data,
        });
      });
  }

}
