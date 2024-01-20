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
  public isError: boolean = false;
  public errorMessage: string = '';
  public id: string = '';
  public postData: Post | any = {};
  public userId: string = '272734628828jd83';

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
    tags: ['', Validators.pattern('^[a-zA-Z0-9, ]+$')],
  });
  public title: string = '';
  public body: string = '';
  public image: string = '';
  public tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private post: PostService
  ) {
    this.route.params.subscribe((params) => {
      const postId = params['id'];
      if (postId) {
        this.isEditing = true;
        this.id = postId;
        this.post.getPostById(postId).subscribe((post) => {
          this.postData = post.data;
          //Pasar valores a los inputs menos al los tags
          this.form.patchValue({ title: this.postData.title });
          this.form.patchValue({ body: this.postData.body });
          this.form.patchValue({ image: this.postData.image });
          this.title = post.data.title;
          this.body = post.data.body;
          this.image = post.data.image;
          this.tags = post.data.tags;
        });
      }
    });
  }
  processTags(newTags: any) {
    this.isError = false;
    this.errorMessage = '';
    if (this.tags.length === 0 && newTags.length === 0) return [];

    // Si no se agrega un nuevo tag o no se elimina uno, no hacer nada
    if (newTags.length === 0 && this.tags.length > 0) return this.tags;

    // Si no hay tags, pero se agregan nuevos, devolver los nuevos
    if (newTags.length > 0 && this.tags.length === 0) {
      const newList = this.form.value.tags
        .split(',')
        .map((tag: string) => tag.trim());
      return newList;
    }
    // Si los arrays son iguales, no hacer nada
    const arryOfTags = this.form.value.tags
      .split(',')
      .map((tag: string) => tag.trim().toLowerCase().split(' ').join(''));
    if (this.areStringArraysEqual(this.tags, arryOfTags)) {
      return this.toaster.error('The tags are the same');
    }
    if (newTags.length > 0 && this.tags.length > 0) {
      const found = this.tags.some((tag: string) => {
        return arryOfTags.includes(tag);
      });
      if (found) {
        return this.toaster.warning('Some of the tags are not in the list');
      }
      console.log(' pasooooooo');
      //quitar espacios en blanco
      const newTagsList = this.form.value.tags
        .split(',')
        .map((tag: string) => tag.trim().toLowerCase().split(' ').join(''));
      //concatenar los tags
      const tags = this.tags.concat(newTagsList);
      //eliminar duplicados
      const uniqueTags = [...new Set(tags)];
      //si hay espacios que devuelva el array con comas
      return uniqueTags;
    }
    if (newTags.includes(',') && newTags.includes(' ')) {
      // Si ya tiene comas, simplemente dividir por comas
      return newTags
        .split(',')
        .map((tag: string) => tag.trim().split(' ').join(', '));
    }
  }

  savePost() {
    if (!this.form.valid) {
      this.toaster.error('Seems that you have some errors in the form');
      return;
    }
    const tagsValues = this.processTags(this.form.value.tags);

    if (this.isEditing) {
      const post: any = {
        title: this.form.value.title,
        body: this.form.value.body,
        image: this.form.value.image,
        tags: tagsValues,
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
        tags: tagsValues,
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
    this.toaster.info('Post canceled');
    this.router.navigate(['hero/home']);
  }

  deleteTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  //Compare arrays
  areStringArraysEqual(strArray1: string[], strArray2: string[]): boolean {
    // Verificar si ambos arrays tienen la misma longitud
    if (strArray1.length !== strArray2.length) {
      return false;
    }

    // Comparar cada elemento individual de los arrays
    for (let i = 0; i < strArray1.length; i++) {
      const list1 = strArray1[i]
        .split(',')
        .map((item) => item.trim().toLowerCase());
      const list2 = strArray2[i]
        .split(',')
        .map((item) => item.trim().toLowerCase());

      // Verificar si las listas tienen la misma longitud
      if (list1.length !== list2.length) {
        return false;
      }

      // Comparar cada elemento individual de las listas
      for (let j = 0; j < list1.length; j++) {
        if (list1[j] !== list2[j]) {
          return false;
        }
      }
    }
    // Si no se encontraron diferencias, los arrays son iguales
    return true;
  }
}
