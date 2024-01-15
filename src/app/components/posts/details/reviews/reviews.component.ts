import { Component, Input, inject } from '@angular/core';
import { PostServiceService } from '../../../../services/posts/post-service.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  @Input() reviews: any;

  constructor() {}
}
