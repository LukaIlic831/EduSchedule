import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ClassModel } from '../../../../state/class/models/class.model';

@Component({
  selector: 'app-reserve-seat',
  imports: [CommonModule],
  templateUrl: './reserve-seat.component.html',
  styleUrl: './reserve-seat.component.scss',
})
export class ReserveSeatComponent implements OnInit {
  firstGroupSeatNumbers = [
    25, 26, 27, 28, 29, 30, 19, 20, 21, 22, 23, 24, 13, 14, 15, 16, 17, 18, 7,
    8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6,
  ];
  secondGroupSeatNumbers = [
    55, 56, 57, 58, 59, 60, 43, 44, 45, 46, 47, 48, 31, 32, 33, 34, 35, 36, 19,
    20, 21, 22, 23, 24, 7, 8, 9, 10, 11, 12,
  ];
  numberOfGroups = [this.firstGroupSeatNumbers];
  @Input() selectedClass!: ClassModel;
  @Input() isProfessor!: boolean;

  ngOnInit() {
    this.arrangeSeatNumbers();
  }

  arrangeSeatNumbers() {
    this.numberOfGroups.length == 2 &&
      this.secondGroupSeatNumbers.forEach(
        (num, index) => (this.firstGroupSeatNumbers[index] = num - 6)
      );
  }
}
