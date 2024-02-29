import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";



function checkAuth(): boolean | Observable<boolean> {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const isValidToken = token !== null && token !== undefined;

  if (!isValidToken) {
    return false;
  }
  return true;
}

function loggedUser(): boolean | Observable<boolean> {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const userToken = authService.checkAuth()

  if (!userToken) {
    router.navigate(['/hero']);
    return false;
  }
  return true;
}

export const AuthGuard = () => {
  return checkAuth();
}

export const LoggedUserGuard = () => {
  return loggedUser();
}