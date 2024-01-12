import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SmallTitleComponent } from '../content/small-title/small-title.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SmallTitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
