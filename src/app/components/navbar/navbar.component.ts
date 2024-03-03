import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { SmallTitleComponent } from '../content/small-title/small-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { LoginResponse, newUser } from '../../interfaces/User';
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
  public isUserLogged: boolean = false;
  public token: string | null = localStorage.getItem('token') as string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  public navItems: any = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path !== '')
    .filter((route) => !route.path?.includes(':'))
    .filter((route) => !route.path?.includes('create'))
    .filter((route) => !route.path?.includes('profile'))
    .filter((route) => !route.path?.includes('login'));

  ngOnInit(): void {
    this.isUserLogged = this.authService.checkAuth();
  }

  goToLogin(): void {
    this.router.navigate(['hero/login']);
  }

  public toggleMenu(): void {
    this.openMenu = !this.openMenu;
  }

  closeMenu(): void {
    this.openMenu = false;
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
    const user: newUser = {
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

  goToProfile() {
    if (!this.isUserLogged && !this.token) {
      this.toast.error(
        'You need to be logged in to access to your profile',
        'We need to know who you are!'
      );
      return;
    }
    this.router.navigate(['/hero/profile']);
  }
}
