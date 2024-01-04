import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadComponent: () => {
      return import('./components/todo/todo.component').then(
        (m) => m.TodoComponent
      );
    },
  },
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  },
];
