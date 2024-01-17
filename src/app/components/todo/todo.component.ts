import { Component, OnInit, inject } from '@angular/core';
import { Todo } from '../../model/Todo';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/posts/post-service.service';
import { Post } from '../../interfaces/Post';
import { PostComponent } from '../posts/post/post.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  title: string = 'Todo';
  userId = '272734628828jd83';

  showTodo = false

  todos: Todo[]  = [];

  public posts: Post[] = [];

  public userPosts = inject(PostService)

  constructor() {
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
  }

  ngOnInit(): void {
    this.userPosts.loadPostsByUserId(this.userId).subscribe(data => {
      this.posts = data.data;
    }
    )
  }
  remove(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  switchTo() {
    this.showTodo = !this.showTodo
  }
}
