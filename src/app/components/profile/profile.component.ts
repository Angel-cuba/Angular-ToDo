import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserDbResponse, UserFromDB } from '../../interfaces/User';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  private userService = inject(UserService);
  public user: UserFromDB = {} as UserFromDB;

public profileForm: FormGroup = this.formBuilder.group({
    username: [''],
    email: [''],
    password: [''],
    image: [''],
    linkedin: [''],
    github: [''],
    bio: [''],
  });

  constructor(private toastService: ToastrService, private formBuilder: FormBuilder) {
    console.log('profile');

    this.userService.loadUser().subscribe({
      next: (res: UserDbResponse) => {
        console.log("🚀 ~ ProfileComponent ~ this.userService.loadUser ~ res:", res)
        this.user = res.data;
      },
      error: (err) => {
        console.log('error', err);
        this.toastService.error('Error loading user data', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('submit');
  }
}
