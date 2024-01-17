import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts/post-service.service';
import { PostComponent } from '../post/post.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Post, PostResponse } from '../../../interfaces/Post';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, PostComponent, ReviewsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  //TODO: Cambiar los types any por los tipos correctos
  public id: string = '';
  public post: Post | any = {};
  public reviews: any = [];

  public route = inject(ActivatedRoute);
  public postService = inject(PostService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      // Hacer el primer fetch para obtener la información del post
      this.postService.getPostById(this.id).subscribe((post) => {
        this.post = post.data;
        // Llamada a la función que procesa el post (por ejemplo, mostrar un modal)
        this.processPost();

        // Hacer el segundo fetch para obtener las reviews basadas en el ID del post
        if (this.post?.reviewIds?.length > 0) {
          this.postService.getReviewsByPostId(this.id).subscribe((reviews) => {
            this.reviews = reviews.data;
            // Llamada a la función que procesa las reviews (por ejemplo, mostrar un modal)
            this.processReviews(reviews);
          });
        }
      });
    });
  }
  //TODO: Añadir alguna libreria para mostrar popups

  // Función que procesa el post
  private processPost() {
    console.log('Post obtenido:', this.post);
    // Puedes realizar cualquier acción adicional basada en la información del post aquí
  }

  // Función que procesa las reviews
  private processReviews(reviews: any) {
    console.log('Reviews obtenidas:', reviews);
    // Puedes realizar cualquier acción adicional basada en las reviews aquí
  }

  goBack() {
    this.router.navigate(['/hero/home']);
  }
}
