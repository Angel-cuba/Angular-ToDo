import { Component } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';
import { CommonModule } from '@angular/common';
import { BigTitleComponent } from '../components/content/big-title/big-title.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, BigTitleComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isLogin: boolean = false;
  showPassword: boolean = false;

  public loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
      ],
    ],
    username: [
      '',
      [Validators.minLength(3), Validators.maxLength(20)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
        ),
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'
        ),
      ],
    ],
    image: ['', [Validators.pattern('https?://.+')]],
    bio: ['', [Validators.minLength(3), Validators.maxLength(50)]],
    github: ['', [Validators.pattern('https?://.+')]],
    linkedin: ['', [Validators.pattern('https?://.+')]],
  });

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  switchLogin() {
    this.isLogin = !this.isLogin;
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  show() {
    this.showPassword = !this.showPassword;
  }

  handleSubmit() {
    if (!this.loginForm.valid) {
      console.error('Submit validation error');
      return;
    }
    if (this.isLogin) {
      console.log('login');
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      console.log(user);
    } else {
      console.log('register');
      if (this.loginForm.value.password !== this.loginForm.value.confirmPassword) {
        console.error('Password and confirm password do not match');
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
      console.log(newUser);
    }
  }
}
