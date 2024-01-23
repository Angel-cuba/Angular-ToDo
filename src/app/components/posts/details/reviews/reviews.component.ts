import { Component, Input } from '@angular/core';
import { Review } from '../../../../interfaces/Reviews';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  @Input() reviews: Review[] = [];
  userPicture: string = 'https://res.cloudinary.com/dqaerysgb/image/upload/v1628020658/samples/bike.jpg';
  userName: string = 'John Doe';

  constructor() {}

  likeReview(reviewId: string) {
    console.log(reviewId);
  }

  dislikeReview(reviewId: string) {
    console.log(reviewId);
  }
}
