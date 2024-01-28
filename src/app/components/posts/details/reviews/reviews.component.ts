import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../../../interfaces/Reviews';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../../services/review/review.service';
import { ToastrService } from 'ngx-toastr';

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

  public userPicture: string =
    'https://res.cloudinary.com/dqaerysgb/image/upload/v1628020658/samples/bike.jpg';
  userName: string = 'John Doe';

  public review: Review | any = {};
  isEditing: boolean = false;

  constructor(private reviewService: ReviewService, private toaster: ToastrService) {}

  likeReview(reviewId: string) {
    console.log(reviewId);
  }

  dislikeReview(reviewId: string) {
    console.log(reviewId);
  }

  editReview(reviewIdToEdit: string) {
    if (reviewIdToEdit === undefined) return;
    this.reviewIdToEdit.emit(reviewIdToEdit);
  }

  deleteReview(reviewIdToEdit: string) {
    if (reviewIdToEdit === undefined) return;
    this.reviewService
      .deleteReview(this.postId, reviewIdToEdit, '272734628828jd83')
      .subscribe({
        next: (response) => {
          const filteredReviews = this.reviews.filter(review => review.id !== reviewIdToEdit);
          this.toaster.success(response.message);
          this.reviews = filteredReviews;
        },
        error: (error) => {
          this.toaster.error(error.message);
        },
      });
  }
}
