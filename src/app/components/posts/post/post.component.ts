import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Post } from '../../../interfaces/Post';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import { SmallTitleComponent } from '../../content/small-title/small-title.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    FontAwesomeModule,
    SmallTitleComponent,
    MatButtonModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post: Post | undefined;
  constructor() {}

  likePost(postId: string | undefined) {
    console.log('🚀 ~ PostComponent ~ likePost ~ postId', postId);
  }
}
