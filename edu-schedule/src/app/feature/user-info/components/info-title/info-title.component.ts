import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-info-title',
  imports: [CommonModule, MatCardModule],
  templateUrl: './info-title.component.html',
  styleUrl: './info-title.component.scss',
})
export class InfoTitleComponent {
  @Input() username!: string;
}
