import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts/post-service.service';
import { PostComponent } from '../post/post.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Post, PostResponse } from '../../../interfaces/Post';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterModule,
    PostComponent,
    ReviewsComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  //TODO: Cambiar los types any por los tipos correctos
  public id: string = '';
  public post: Post | any = {};
  public reviews: any = [];
  public isEditing: boolean = false;

  public body: string = '';

  public form: FormGroup = this.formBuilder.group({
    body: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(200)],
    ],
  });

  constructor(
    private router: Router,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      // Hacer el primer fetch para obtener la información del post
      this.postService.getPostById(this.id).subscribe((post) => {
        this.post = post.data;
        // Llamada a la función que procesa el post (por ejemplo, mostrar un modal)
        this.processPost();

        // Hacer el segundo fetch para obtener las reviews basadas en el ID del post
        if (this.post?.reviewIds?.length > 0) {
          this.postService.getReviewsByPostId(this.id).subscribe((reviews) => {
            this.reviews = reviews.data;
            // Llamada a la función que procesa las reviews (por ejemplo, mostrar un modal)
            this.processReviews(reviews);
          });
        }
      });
    });
  }

  // Función que procesa el post
  private processPost() {
    console.log('Post obtenido:', this.post);
    // Puedes realizar cualquier acción adicional basada en la información del post aquí
    this.toaster.info(
      'Let us know what you think about this post!',
      this.post.title,
      {
        timeOut: 2000,
        messageClass: 'toast-message',
      }
    );
  }

  // Función que procesa las reviews
  private processReviews(reviews: any) {
    console.log('Reviews obtenidas:', reviews);
    // Puedes realizar cualquier acción adicional basada en las reviews aquí
  }

  saveReview() {
    if (!this.form.valid) {
      return;
    }
    const review = {
      body: this.form.value.body,
      authorId: '272734628828jd83',
    };
    console.log('🚀 ~ DetailsComponent ~ saveReview ~ review:', review);

    // Llamada a la función que guarda la review
    // this.postService.createReview(review).subscribe((review) => {
    // Llamada a la función que procesa la review (por ejemplo, mostrar un modal)
    //this.processReview(review);
    // });
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['/hero/home']);
  }
}
