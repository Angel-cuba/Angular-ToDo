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

  constructor() {}
}
