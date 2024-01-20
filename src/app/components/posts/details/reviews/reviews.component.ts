import { Component, Input, OnInit, inject } from '@angular/core';
import { ReviewIds } from '../../../../interfaces/Post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../services/posts/post-service.service';

type ReviewsResponse = {
  data: ReviewIds[];
  message: string;
  status: string;
}
@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  public reviews: ReviewsResponse[] | any= [];
  @Input() id: string = '';

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getReviewsByPostId(this.id).subscribe((reviews) => {
      this.reviews = reviews.data;
    });
  }
}
