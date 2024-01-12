import { Component, inject } from '@angular/core';
import { PostServiceService } from '../../services/posts/post-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  public service = inject(PostServiceService);

  constructor() {}

  dataPosts() {
    return this.service.loadPosts();
  }
}
