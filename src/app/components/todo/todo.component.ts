import { Component } from '@angular/core';
import { Todo } from '../../model/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  title: string = 'Todo';

  todos: Todo[]  = [];

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

  remove(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
