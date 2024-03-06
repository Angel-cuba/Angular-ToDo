import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { PostsComponent } from './components/posts/posts.component';
import { FormComponent } from './components/form/form.component';
import { PostComponent } from './components/posts/post/post.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TodoComponent } from './components/todo/todo.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsComponent } from './components/posts/details/details.component';
import { AuthGuard } from './guards/auth-guards';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
  {
    path: 'hero',
    component: HeroComponent,
    children: [
      {
        path: 'home',
        component: PostsComponent,
      },
      {
        path: 'home/post/:id',
        component: DetailsComponent,
      },
      {
        path: 'home/create',
        component: FormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'home/edit/:id',
        component: FormComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view/:id',
        component: PostComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'activity',
        component: TodoComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: SigninComponent
      },
      {
        path: '',
        redirectTo: 'home',
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
