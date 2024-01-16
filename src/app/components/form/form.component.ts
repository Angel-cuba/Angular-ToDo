import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public isEditing: boolean = false;
  public id: string = '';
  public route = inject(ActivatedRoute);

  public form: FormGroup = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    body: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    authorId: [''],
    image: ['', [Validators.required, Validators.pattern('https?://.+')]],
    tags: [''],
  });
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.route.params.subscribe((params) => {
      const postId = params['id'];
      if (postId) {
        this.isEditing = true;
        this.id = postId;
      }
    });
  }

  savePost() {
    if (!this.form.valid) {
      console.log('Formulario no válido:', this.form.value);
    }
    const post = {
      ...this.form.value,
      authorId: '123',
    }
      console.log("🚀 ~ FormComponent ~ savePost ~ post:", post)
  }
}
