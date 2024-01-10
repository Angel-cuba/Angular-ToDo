import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  url: string = environment.localUrl;

  #postState = signal<any>({ posts: [] });
  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  loadPosts() {
    this.http
      .get(this.url + 'posts/all')
      .pipe(delay(1000))
      .subscribe(
        (data) => {
          console.log(data);
          this.#postState.set(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
