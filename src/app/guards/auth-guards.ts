import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

function checkAuth(): boolean | Observable<boolean> {
  const toast = inject(ToastrService);
  const session = localStorage.getItem('session') ?? '';
  const sessionData = JSON.parse(session);

  if (sessionData.data.token) {
    return true;
  } else {
    toast.error('Your session has expired', 'Unauthorized', {
      timeOut: 1500,
    });
    return false;
  }
}

export const AuthGuard = () => {
  return checkAuth();
};

