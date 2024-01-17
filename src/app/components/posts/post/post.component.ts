import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../interfaces/Post';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { SmallTitleComponent } from '../../content/small-title/small-title.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts/post-service.service';

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
    RouterModule,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post: Post | any;
  public id: string = '';
  public liked: boolean = false;
  public userId: string = '272734628828jd83';

  public route = inject(ActivatedRoute);
  public postService = inject(PostService);

  constructor(private router: Router) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  likePost(id: string | undefined) {
    this.liked = !this.liked;
    console.log('🚀 ~ PostComponent ~ likePost ~ postId', id);
    console.log('this id', this.id);
  }

  editPost(id: string | undefined) {
    this.router.navigate(['hero/home/edit/' + id]);
  }

  deletePost(id: string | undefined) {
    if (id === undefined) return;
    this.postService.deletePost(id, this.userId).subscribe((post) => {
      console.log('🚀 ~ PostComponent ~ deletePost ~ post', post);
      this.router.navigate(['hero/home']);
    });
  }
}
