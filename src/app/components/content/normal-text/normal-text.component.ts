import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-normal-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './normal-text.component.html',
  styleUrl: './normal-text.component.scss'
})
export class NormalTextComponent {
@Input() text!: string
}
