import { Component, inject } from '@angular/core';
import { PostServiceService } from '../../services/posts/post-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmallTitleComponent } from '../content/small-title/small-title.component';
import { PostComponent } from './post/post.component';
import {MatProgressBarModule } from '@angular/material/progress-bar';
import { BigTitleComponent } from '../content/big-title/big-title.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, SmallTitleComponent, PostComponent, MatProgressBarModule, BigTitleComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  public service = inject(PostServiceService);

  constructor() {}
}
