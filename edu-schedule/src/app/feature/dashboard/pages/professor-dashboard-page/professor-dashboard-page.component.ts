import { Component } from '@angular/core';
import { ClassComponent } from '../../../../shared/components/class/class.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-dashboard-page',
  imports: [ClassComponent, RouterLink],
  templateUrl: './professor-dashboard-page.component.html',
  styleUrl: './professor-dashboard-page.component.scss'
})
export class ProfessorDashboardPageComponent {

}
