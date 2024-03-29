import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserDbResponse, UserFromDB } from '../../interfaces/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private userService = inject(UserService);
  public user: UserFromDB = {} as UserFromDB;
  constructor(private toastService: ToastrService) {
    console.log('profile');

    this.userService.loadUser().subscribe({
      next: (res: UserDbResponse) => {
        console.log("🚀 ~ ProfileComponent ~ this.userService.loadUser ~ res:", res)
        this.user = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
