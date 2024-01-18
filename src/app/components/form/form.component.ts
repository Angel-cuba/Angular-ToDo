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
import { PostService } from '../../services/posts/post-service.service';
import { Post } from '../../interfaces/Post';
import { TagComponent } from '../posts/tag/tag.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    TagComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public isEditing: boolean = false;
  public id: string = '';
  public postData: Post | any = {};
  public userId: string = '272734628828jd83';

  public route = inject(ActivatedRoute);
  public post = inject(PostService);

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
  public title: string = '';
  public body: string = '';
  public image: string = '';
  public tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      const postId = params['id'];
      if (postId) {
        this.isEditing = true;
        this.id = postId;
        this.post.getPostById(postId).subscribe((post) => {
          this.postData = post.data;
          this.form.patchValue(this.postData);
          this.title = this.form.value.title;
          this.body = this.form.value.body;
          this.image = this.form.value.image;
          this.tags = this.form.value.tags;
        });
      }
    });
  }
  processTags(tags: string | string[]) {
    if (!tags || tags.length === 0) return [];

    // Si tags es una cadena, convertirla a un array
    if (typeof tags === 'string') {
      if (tags.includes(',')) {
        // Si ya tiene comas, simplemente dividir por comas
        return tags.split(',');
      } else {
        // Si no tiene comas, agregarlas y luego dividir por espacios
        const chain = tags.split(' ').join(',');
        return chain.split(',');
      }
    } else if (Array.isArray(tags)) {
      // Si tags es un array, devolverlo directamente
      return tags;
    } else {
      // Manejar otros casos según sea necesario
      this.toaster.error('Formato de tags no compatible');
      return [];
    }
  }

  savePost() {
    if (!this.form.valid) return;

    if (this.isEditing) {
      const post: any = {
        title: this.form.value.title,
        body: this.form.value.body,
        image: this.form.value.image,
        tags: this.form.value.tags
          ? this.processTags(this.form.value.tags)
          : [],
        authorId: this.userId,
      };
      this.post.editPost(this.id, post, this.userId).subscribe({
        next: (response) => {
          this.toaster.success(response.message);
          this.router.navigate(['hero/home']);
        },
        error: (error) => {
          this.toaster.error(error.message);
        },
      });
    } else {
      const post: any = {
        title: this.form.value.title,
        body: this.form.value.body,
        image: this.form.value.image,
        tags: this.form.value.tags
          ? this.processTags(this.form.value.tags)
          : [],
        authorId: this.userId,
      };
      this.post.createPost(post).subscribe({
        next: (response) => {
          this.toaster.success(response.message);
          this.router.navigate(['hero/home']);
        },
        error: (error) => {
          this.toaster.error(error.message);
        },
      });
    }
  }

  cancelPost() {
    if (this.form.valid) {
      this.form.reset();
    }
    this.router.navigate(['hero/home']);
  }

  deleteTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }
}
