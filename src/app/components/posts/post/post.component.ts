import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../interfaces/Post';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import { SmallTitleComponent } from '../../content/small-title/small-title.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    RouterModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post: Post | undefined;
  public id : string = '';

  public route = inject(ActivatedRoute);
  constructor(private router: Router) {
   this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  likePost(post: any | undefined) {
    console.log('🚀 ~ PostComponent ~ likePost ~ postId', this.post);

  }
}
