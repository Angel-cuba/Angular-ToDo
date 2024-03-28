import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { SmallTitleComponent } from '../content/small-title/small-title.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { UserInLocalStorage } from '../../services/auth/session';

interface Route {
  path?: string;
  children?: Route[];
  disabled?: boolean;
}

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

export class NavbarComponent implements OnInit {
  public openMenu: boolean = false;
  public isUserLogged: boolean = false;
  public userImage: string | undefined = '';
  public defaultImage: string =
    'https://res.cloudinary.com/dqaerysgb/image/upload/v1648218398/istockphoto-1132926013-612x612_t1xwec.jpg';
  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  public navItems: Route[] = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path !== '')
    .filter((route) => !route.path?.includes(':'))
    .filter((route) => !route.path?.includes('create'))
    .filter((route) => !route.path?.includes('profile'))
    .filter((route) => !route.path?.includes('login'));

  ngOnInit(): void {
    this.subscription = this.authService.getSessionStatus().subscribe({
      next: (isAuthenticated: UserInLocalStorage) => {
        this.isUserLogged = isAuthenticated.isLoggedIn;
        this.setUserImage();
      },
      error: (err) => {
        console.error('🚀 ~ NavbarComponent ~ ngOnInit ~ error', err);
      },
    });
  }

  goToLogin(): void {
    if (this.isUserLogged) {
      this.authService.logout();
      this.isUserLogged = false;
    } else {
      this.router.navigate(['hero/login']);
    }
  }

  public toggleMenu(): void {
    this.openMenu = !this.openMenu;
  }

  closeMenu(): void {
    this.openMenu = false;
  }

  goToProfile() {
    const session = localStorage.getItem('session') ?? '';
    if (!session) {
      this.toast.error(
        'You need to be logged in to access to your profile',
        'We need to know who you are!'
      );
      return;
    }
    this.router.navigate(['/hero/profile']);
  }

  setUserImage() {
    const session = localStorage.getItem('session') ?? '';
    if (session) {
      const sessionData = JSON.parse(session);
      this.userImage = sessionData.data.user.image;
    }
  }

//TODO: Use later this method to handle image veracity
  getUserImage() {
    return this.userImage ? this.userImage : this.defaultImage;
  }
}
