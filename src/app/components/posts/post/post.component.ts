import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Post } from '../../../interfaces/Post';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { SmallTitleComponent } from '../../content/small-title/small-title.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts/post-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { UserInLocalStorage } from '../../../services/auth/session';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    FontAwesomeModule,
    SmallTitleComponent,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  @Input() post: Post | any;
  public id: string = '';
  public liked: boolean = false;
  public userId: string = '';
  public isLoggedIn: boolean = false;
  public subscription: Subscription = new Subscription();
  public route = inject(ActivatedRoute);
  public postService = inject(PostService);

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private authService: AuthService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.checkSessionState();
    this.checkIfUserLikedPost();
    this.userId = this.authService.getUserId();
  }

  checkSessionState() {
    this.subscription = this.authService.getSessionStatus().subscribe({
      next: (isAuthenticated: UserInLocalStorage) => {
        this.isLoggedIn = isAuthenticated.isLoggedIn;
      },
      error: (err: any) => {
        console.error('🚀 ~ PostComponent ~ checkSessionState ~ error', err);
      },
    });
  }

  likePost(id: string) {
    if (!this.isLoggedIn) {
      this.toaster.error(
        'You need to be logged in to like a post.',
        'Login first!'
      );
      return;
    }
    this.liked = !this.liked;
    this.postService.likeOrDislikePost(id, this.userId).subscribe({
      next: (post) => {
        console.log(
          '🚀 ~ PostComponent ~ this.postService.likeOrDislikePost ~ post:',
          post
        );
        // update the post with the new like
        this.post = post.data;
        this.toaster.success(`${post.message}`, `${post.status}`, {
          timeOut: 1500,
        });
      },
      error: (error) => {
        console.error('🚀 ~ PostComponent ~ likePost ~ error', error);
      },
    });
  }

  editPost(id: string | undefined) {
    this.router.navigate(['hero/home/edit/' + id]);
  }

  checkIfUserLikedPost() {
    if (!this.isLoggedIn) return;
    const listOfUserLikes = this.post.likes;
    if (listOfUserLikes?.length > 0 && listOfUserLikes !== undefined) {
      const checkUser = this.post.likes.includes(this.userId);
      if (checkUser) {
        this.liked = true;
      }
    }
  }

  deletePost(id: string | undefined) {
    if (id === undefined) return;
    this.postService.deletePost(id, this.userId).subscribe((post) => {
      //TODO: handle error here and respond with a toaster
      console.log('🚀 ~ PostComponent ~ deletePost ~ post', post);
      this.router.navigate(['hero/home']);
    });
  }

}
