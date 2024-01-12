import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'hero',
    loadComponent: () => {
      return import('./components/hero/hero.component').then(
        (m) => m.HeroComponent
      );
    },
    children: [
      {
        path: 'posts',
        loadComponent: () => {
          return import('./components/posts/posts.component').then(
            (m) => m.PostsComponent
          );
        },
      },
      {
        path: 'create',
        loadComponent: () => {
          return import('./components/form/form.component').then(
            (m) => m.FormComponent
          );
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () => {
          return import('./components/form/form.component').then(
            (m) => m.FormComponent
          );
        },
      },
      {
        path: 'view/:id',
        loadComponent: () => {
          return import('./components/posts/post/post.component').then(
            (m) => m.PostComponent
          );
        },
      },
      {
        path: 'about',
        loadComponent: () => {
          return import('./components/about/about.component').then(
            (m) => m.AboutComponent
          );
        },
      },
      {
        path: 'contact',
        loadComponent: () => {
          return import('./components/contact/contact.component').then(
            (m) => m.ContactComponent
          );
        },
      },
      {
        path: 'activity',
        loadComponent() {
          return import('./components/todo/todo.component').then(
            (m) => m.TodoComponent
          );
        },
      },
      {
        path: 'profile',
        loadComponent: () => {
          return import('./components/profile/profile.component').then(
            (m) => m.ProfileComponent
          );
        },
      },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/hero',
    pathMatch: 'full',
  },
];
