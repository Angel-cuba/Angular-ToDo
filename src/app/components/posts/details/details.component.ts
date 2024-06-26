import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts/post-service.service';
import { PostComponent } from '../post/post.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Post } from '../../../interfaces/Post';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewService } from '../../../services/review/review.service';
import { Review } from '../../../interfaces/Reviews';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { UserInLocalStorage } from '../../../services/auth/session';


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
  public postId: string = '';
  public post: Post = {} as Post;
  public reviews: Review[] = [];
  public isEditing: boolean = false;
  public review: Review = {} as Review;
  public subscription: Subscription = new Subscription();
  public isUserLogged: boolean = false;

  private _reviewId: string = '';

  @Input()
  set reviewIdToEdit(value: string) {
    this._reviewId = value;
    this.isEditing = true;
    this.getReview();
  }

  get reviewIdToEdit(): string {
    return this._reviewId;
  }

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
    private postService: PostService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {
    this.subscription = this.authService.getSessionStatus().subscribe({
      next: (response: UserInLocalStorage) => {
        this.isUserLogged = response.isLoggedIn;
      },
      error: (error) => {
        this.toaster.error('Error verifying authentication', 'Error');
        this.router.navigate(['hero/login']);
      },
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];

      // Hacer el primer fetch para obtener la información del post
      this.postService.getPostById(this.postId).subscribe({
        next: (response) => {
          this.post = response.data;
          this.processPost();

          // Hacer el segundo fetch para obtener las reviews basadas en el ID del post
          if (this.post?.reviewIds?.length) {
            this.loadReviews();
          }
        },
        error: (error) => {
          this.toaster.error('Error loading post', 'Error');
        },
      });
    });
  }

  // Función que procesa el post
  private processPost() {
    // Acción adicional basada en la información del post
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
  private processReviews(reviewsLength: number) {
    this.toaster.show(`This post has ${reviewsLength} reviews`);
  }

  loadReviews() {
    if (!this.postId) return;
    this.reviewService.getReviewsByPostId(this.postId).subscribe((reviews) => {
      this.reviews = reviews.data;
      // Llamada a la función que procesa las reviews (por ejemplo, mostrar un modal)
      this.processReviews(reviews?.data?.length);
    });
  }

  getReview() {
    if (!this.reviewIdToEdit) return;

    const token = this.authService.getToken();

    this.reviewService.getReviewById(this.reviewIdToEdit, token).subscribe({
      next: (response) => {
        this.review = response.data;
        this.form.patchValue({
          body: this.review.body,
        });
      },
      error: (error) => {
        this.toaster.error('Error loading review', 'Error');
      },
    });
  }

  handleReview() {
    if (!this.form.valid) {
      return;
    }
    // Call methods to get user id and token (if needed)
    const userId = this.authService.getUserId();
    const token = this.authService.getToken();
    const review = {
      body: this.form.value.body,
      authorId: userId,
    };
    if (!this.isEditing) {
      // Llamada a la función que guarda la review
      this.reviewService.createReview(this.postId, review, token).subscribe({
        next: (response) => {
          this.form.reset();
          // Llamada a la función que carga las reviews
          // Si no hay reviews, esperar 2 segundos ya que sería el primer review
          if(this.reviews.length > 0) {
            this.loadReviews();
          } else {
            setTimeout(() => {
              this.loadReviews();
            }, 2000);
          }
          this.toaster.success(response.message, 'Success', {
            timeOut: 1500,
          });
        },
        error: (error) => {
          this.toaster.error('Error creating review', 'Error');
        },
      });
    } else {
      this.reviewService
        .editReview(this.postId, this.reviewIdToEdit, userId, review, token)
        .subscribe({
          next: (response) => {
            this.form.reset();
            this.reviewIdToEdit = '';
            this.isEditing = false;
            this.review = {} as Review;
            // Load the reviews
            this.loadReviews();
            this.toaster.success(response.message, 'Success');
          },
          error: (error) => {
            this.toaster.error('Error editing review', 'Error');
          },
        });
    }
  }

  goBack() {
    this.router.navigate(['/hero/home']);
  }

  show(value: string) {
    this.reviewIdToEdit = value;
  }
}
