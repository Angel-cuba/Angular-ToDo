import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-title.component.html',
  styleUrl: './small-title.component.scss',
})
export class SmallTitleComponent {
  @Input() title!: string;
}
