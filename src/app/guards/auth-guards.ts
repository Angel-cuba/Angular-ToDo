import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

function checkAuth(): boolean | Observable<boolean> {
  const toast = inject(ToastrService);
  const token = localStorage.getItem('token');

  const isValidToken = token !== null && token !== undefined;

  if (!isValidToken) {
    toast.error('You have to login first', 'Unauthorized', {
      timeOut: 1500,
    });
    return false;
  }
  return true;
}

function loggedUser(): boolean | Observable<boolean> {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  const userToken = authService.checkAuth();

  if (!userToken) {
    toastr.error('Your session has expired', 'Unauthorized', {
      timeOut: 1500,
      })
    router.navigate(['/hero']);
    return false;
  }
  return true;
}

export const AuthGuard = () => {
  return checkAuth();
};

export const LoggedUserGuard = () => {
  return loggedUser();
};
