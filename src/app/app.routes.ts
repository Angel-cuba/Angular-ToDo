import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { PostsComponent } from './components/posts/posts.component';
import { FormComponent } from './components/form/form.component';
import { PostComponent } from './components/posts/post/post.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TodoComponent } from './components/todo/todo.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: 'hero',
    component: HeroComponent,
    children: [
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'create',
        component: FormComponent
      },
      {
        path: 'edit/:id',
       component: FormComponent
      },
      {
        path: 'view/:id',
        component: PostComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'activity',
        component: TodoComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
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
