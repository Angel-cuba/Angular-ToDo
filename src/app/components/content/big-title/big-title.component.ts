import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './big-title.component.html',
  styleUrl: './big-title.component.scss',
})
export class BigTitleComponent {
  @Input({ required: true }) title!: string;
}
