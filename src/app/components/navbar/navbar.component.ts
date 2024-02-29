import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { SmallTitleComponent } from '../content/small-title/small-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { LoginResponse } from '../../interfaces/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SmallTitleComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public openMenu: boolean = false;
  public loginView: boolean = true;
  public registerView: boolean = false;
  public isUserLogged: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {
    console.log(this.loginView);
  }

  public navItems: any = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path !== '')
    .filter((route) => !route.path?.includes(':'))
    .filter((route) => !route.path?.includes('create'))
    .filter((route) => !route.path?.includes('profile'));

  ngOnInit(): void {
    this.isUserLogged = this.authService.checkAuth();
  }

  public toggleMenu(): void {
    this.openMenu = !this.openMenu;
  }

  closeMenu(): void {
    this.openMenu = false;
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeMenu();
  }

  loginUser() {
    if (this.isUserLogged) {
      this.authService.logout();
      this.isUserLogged = false;
    } else {
      const user = {
        email: 'user2@gmail.com',
        password: '123456',
      };
      // if (this.loginView) {
      this.authService.login(user).subscribe((result: LoginResponse) => {
        console.log(
          '🚀 ~ NavbarComponent ~ this.authService.login ~ result:',
          result
        );
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        this.isUserLogged = true;
      });
    }
  }

  registerUser() {
    console.log('register');
    const user = {
      email: 'user11@gmail.com',
      username: 'toto',
      password: '123456',
      image: 'https:www',
      bio: 'Im goo guy',
      github: 'github',
      linkedin: 'linkedin',
    };
    this.authService.register(user).subscribe({
      next: (user) => {
        console.log('🚀 ~ NavbarComponent ~ regiterUser ~ user', user);
      },
      error: (error) => {
        console.log('🚀 ~ NavbarComponent ~ regiterUser ~ error', error);
      },
    });
  }

  toggleLoginView(): void {
    this.loginView = !this.loginView;
    this.registerView = !this.registerView;
  }

  goToProfile() {
    const checkToken = this.authService.checkAuth();
    if (!checkToken) {
      this.toast.error(
        'You need to be logged in to access to your profile',
        'Error'
      );
      return;
    }
    this.router.navigate(['/hero/profile']);
  }
}
