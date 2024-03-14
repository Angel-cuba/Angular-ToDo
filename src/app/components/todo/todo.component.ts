import { Component, OnInit, inject } from '@angular/core';
import { Todo } from '../../model/Todo';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/posts/post-service.service';
import { Post } from '../../interfaces/Post';
import { PostComponent } from '../posts/post/post.component';
import { UserInLocalStorage } from '../../services/auth/session';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  public title: string = 'Todo';
  public todos: Todo[] = [];
  public posts: Post[] = [];
  public userPosts = inject(PostService);
  public showTodo: boolean = false;
  public isUserLogged: boolean = false;
  public subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.todos = [
      {
        id: 1,
        title: 'Learn Angular',
        completed: true,
      },
      {
        id: 2,
        title: 'Learn React',
        completed: false,
      },
      {
        id: 3,
        title: 'Learn Vue',
        completed: false,
      },
    ];

    this.subscription = this.authService.getSessionStatus().subscribe({
      next: (response: UserInLocalStorage) => {
        this.isUserLogged = response.isLoggedIn;
      },
      error: (error) => {
        this.toaster.error('Error verifying authentication', 'Error');
        this.router.navigate(['hero/login']);
      },
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!this.isUserLogged) {
      this.toaster.error(
        'You have to login before...',
        'Yooooooo! Something went wrong!'
      );
    } else {
      this.userPosts.loadPostsByUserId(userId).subscribe({
        next: (response) => {
          this.posts = response.data;
        },
        error: (error) => {
          this.toaster.error('Error loading posts', 'Error');
        },
      });
    }
  }
  remove(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  switchTo() {
    this.showTodo = !this.showTodo;
  }
}
