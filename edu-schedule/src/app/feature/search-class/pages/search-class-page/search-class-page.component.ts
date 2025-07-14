import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ClassComponent } from '../../../../shared/components/class/class.component';

@Component({
  selector: 'app-search-class-page',
  imports: [
    NavComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ClassComponent,
  ],
  templateUrl: './search-class-page.component.html',
  styleUrl: './search-class-page.component.scss',
})
export class SearchClassPageComponent {
}
