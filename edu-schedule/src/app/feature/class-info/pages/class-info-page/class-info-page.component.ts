import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/components/nav/nav.component';
import { ReserveSeatComponent } from '../../components/reserve-seat/reserve-seat.component';

@Component({
  selector: 'app-class-info-page',
  imports: [NavComponent, ReserveSeatComponent],
  templateUrl: './class-info-page.component.html',
  styleUrl: './class-info-page.component.scss'
})
export class ClassInfoPageComponent {

}
