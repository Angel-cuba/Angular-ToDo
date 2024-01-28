import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../../../interfaces/Reviews';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../../../services/review/review.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  @Input() reviews: Review[] = [];
  @Output() reviewIdChange = new EventEmitter<string>();
  public userPicture: string =
    'https://res.cloudinary.com/dqaerysgb/image/upload/v1628020658/samples/bike.jpg';
  userName: string = 'John Doe';

  public review: Review | any = {};
  isEditing: boolean = false;

  constructor(private reviewService: ReviewService) {}

  likeReview(reviewId: string) {
    console.log(reviewId);
  }

  dislikeReview(reviewId: string) {
    console.log(reviewId);
  }


  editReview(reviewId: string) {
    if (reviewId === undefined) return;
    this.reviewIdChange.emit(reviewId);
  }

  deleteReview(reviewId: string) {
    console.log(reviewId);
  }
}
