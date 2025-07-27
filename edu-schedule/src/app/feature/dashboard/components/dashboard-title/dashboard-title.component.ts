import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-title',
  imports: [],
  templateUrl: './dashboard-title.component.html',
  styleUrl: './dashboard-title.component.scss',
})
export class DashboardTitleComponent {
  @Input() username: string = '';
}
