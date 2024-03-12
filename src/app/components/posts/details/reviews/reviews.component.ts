import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../../../interfaces/Reviews';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../../services/review/review.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserInLocalStorage } from '../../../../services/auth/session';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  @Input() reviews: Review[] = [];
  @Input() postId: string = '';
  @Output() reviewIdToEdit = new EventEmitter<string>();
  public isUserLoggedIn: boolean = false;
  public userId: string = '';

  public userPicture: string =
    'https://res.cloudinary.com/dqaerysgb/image/upload/v1628020658/samples/bike.jpg';
  userName: string = 'John Doe';


  isEditing: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private toaster: ToastrService,
    private authService: AuthService
  ) {
    this.authService.getSessionStatus().subscribe({
      next: (response: UserInLocalStorage) => {
        this.isUserLoggedIn = response.isLoggedIn;
        this.userId = this.authService.getUserId();
      },
      error: (error) => {
        this.isUserLoggedIn = false;
        this.toaster.error('Error getting user status', 'Error!');
      },
    });
  }

  likeReview(reviewId: string) {
    console.log(reviewId);
  }

  dislikeReview(reviewId: string) {
    console.log(reviewId);
  }

  editReview(reviewIdToEdit: string) {
    if (reviewIdToEdit === undefined) return;

    if (this.isUserLoggedIn === false) {
      this.toaster.error(
        'You need to be logged in to edit a review',
        'Stop there!'
      );
      return;
    }
    this.reviewIdToEdit.emit(reviewIdToEdit);
  }

  deleteReview(reviewIdToEdit: string) {
    if (reviewIdToEdit === undefined) return;

    const token = this.authService.getToken();
    this.reviewService
      .deleteReview(this.postId, reviewIdToEdit, this.userId, token)
      .subscribe({
        next: (response) => {
          const filteredReviews = this.reviews.filter(
            (review) => review.id !== reviewIdToEdit
          );
          this.toaster.success(response.message);
          this.reviews = filteredReviews;
        },
        error: (error) => {
          this.toaster.error(error.message);
        },
      });
  }
}
