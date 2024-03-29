import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigTitleComponent } from '../components/content/big-title/big-title.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserInLocalStorage } from '../services/auth/session';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, BigTitleComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isLogin: boolean = true;
  showPassword: boolean = false;

  public loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
      ],
    ],
    username: ['', [Validators.minLength(3), Validators.maxLength(20)]],
    password: [
      '',
      [
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(20),
        // Validators.pattern(
        //   '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
        // ),
      ],
    ],
    confirmPassword: [
      // '',
      // [
      //   Validators.minLength(8),
      //   Validators.maxLength(20),
      //   Validators.pattern(
      //     '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
      //   ),
      // ],
    ],
    image: ['', [Validators.pattern('https?://.+')]],
    bio: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    github: ['', [Validators.pattern('https?://.+')]],
    linkedin: ['', [Validators.pattern('https?://.+')]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  switchLogin() {
    this.isLogin = !this.isLogin;
  }

  show() {
    this.showPassword = !this.showPassword;
  }

  handleSubmit() {
    if (!this.loginForm.valid) {
      this.toastr.error('Some fields are invalid, please check and try again.', 'Check your form fields.');
      return;
    }
    if (this.isLogin) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(user).subscribe({
        next: (response: UserInLocalStorage) => {
          this.authService.saveSession(response);
          response.isLoggedIn = true;
          this.authService.refreshSession(response);
          this.router.navigate(['/hero/home']);
        },
        error: (error) => {
          this.toastr.error('Invalid email or password');
        },
      });
    } else {
      if (
        this.loginForm.value.password !== this.loginForm.value.confirmPassword
      ) {
        this.toastr.error('Password and confirm password do not match', 'Please enter the same password in both fields.');
        return;
      }
      const newUser = {
        email: this.loginForm.value.email,
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        image: this.loginForm.value.image,
        bio: this.loginForm.value.bio,
        github: this.loginForm.value.github,
        linkedin: this.loginForm.value.linkedin,
      };
      this.authService.register(newUser).subscribe({
        next: (response: UserInLocalStorage) => {
          this.authService.saveSession(response);
          response.isLoggedIn = true;
          this.authService.refreshSession(response);
          this.router.navigate(['/hero/home']);
        },
        error: (error) => {
          this.toastr.error('Error creating user', 'Error', {
            timeOut: 1500,
          });
        },
      });
    }
  }
}
