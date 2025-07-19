import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ClassModel } from '../../../../state/class/models/class.model';
import { Seat } from '../../../../state/education-data/models/seat.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Student } from '../../../../state/auth/models/student.model';
import { notZeroOrNullValidator } from '../../../../validators/not-zero-or-null.validator';
import { reserveSeatInClass } from '../../../../state/class/class.actions';
import { selectSelectedClass } from '../../../../state/class/class.selectors';
import { ReserveLegendComponent } from './reserve-legend/reserve-legend.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface DisplaySeat {
  seatNumber: number;
  status: 'selected' | 'reserved' | 'available';
  studentIndex: number | null;
}

@Component({
  selector: 'app-reserve-seat',
  imports: [CommonModule, ReactiveFormsModule, ReserveLegendComponent],
  templateUrl: './reserve-seat.component.html',
  styleUrl: './reserve-seat.component.scss',
})
export class ReserveSeatComponent implements OnInit {
  reserveSeatForm: FormGroup;
  firstGroupOfSeats: DisplaySeat[] = [];
  secondGroupOfSeats: DisplaySeat[] = [];
  numberOfGroups: DisplaySeat[][] = [];
  selectedClass: ClassModel | null = null;
  @Input() isProfessor!: boolean;
  @Input() currentStudent: Student | null = null;
private destroyRef = inject(DestroyRef);
  constructor(private store: Store, private fb: FormBuilder) {
    this.reserveSeatForm = this.fb.group({
      seatNumber: [0, notZeroOrNullValidator()],
    });
  }

  ngOnInit() {
    this.store
      .select(selectSelectedClass)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((selectedClass) => {
        this.selectedClass = selectedClass;
        this.initializeGroups();
        this.updateGroups();
        this.updateStatus();
        this.buildNumberOfGroups();
      });
  }

  updateGroups() {
    if (this.selectedClass?.classroom.numberOfSeats! > 30) {
      this.secondGroupOfSeats.forEach(
        (num, index) =>
          (this.firstGroupOfSeats[index] = {
            ...this.firstGroupOfSeats[index],
            seatNumber: num.seatNumber - 6,
          })
      );
    }
  }

  updateStatus() {
    const reservedSeats = this.selectedClass?.classroom.reservedSeats!;
    this.firstGroupOfSeats = this.setSeatsStatusAndIndex(
      this.firstGroupOfSeats,
      reservedSeats
    );

    this.selectedClass?.classroom.numberOfSeats! > 30 &&
      (this.secondGroupOfSeats = this.setSeatsStatusAndIndex(
        this.secondGroupOfSeats,
        reservedSeats
      ));
  }

  setSeatsStatusAndIndex(
    GroupOfSeats: DisplaySeat[],
    reservedSeats: Seat[]
  ): DisplaySeat[] {
    return GroupOfSeats.map((seat) => ({
      ...seat,
      status: reservedSeats!.find((s) => s.numberOfSeat == seat.seatNumber)
        ? 'reserved'
        : 'available',
      studentIndex:
        reservedSeats!.find((s) => s.numberOfSeat == seat.seatNumber)
          ?.studentIndex ?? 0,
    }));
  }

  selectSeat(selectedSeat: DisplaySeat) {
    this.reserveSeatForm.patchValue({ seatNumber: selectedSeat.seatNumber });
    this.numberOfGroups = this.numberOfGroups.map((group) =>
      group.map((seat) => {
        if (seat.status === 'reserved') return seat;
        if (seat.seatNumber === selectedSeat.seatNumber) {
          return { ...seat, status: 'selected' };
        }

        return { ...seat, status: 'available' };
      })
    );
  }

  onSubmit() {
    if (this.reserveSeatForm.valid) {
      const { seatNumber } = this.reserveSeatForm.value;
      this.store.dispatch(
        reserveSeatInClass({
          seatForReservation: {
            numberOfSeat: seatNumber,
            classroomId: this.selectedClass?.classroom.id!,
            studentIndex: this.currentStudent?.index!,
            userId: this.currentStudent?.userId!,
          },
        })
      );
    }
  }

  isThisClassReservedByThisUser(): DisplaySeat | undefined {
    return this.numberOfGroups
      .flat()
      .find((seat) => seat.studentIndex === this.currentStudent?.index);
  }

  initializeGroups() {
    this.numberOfGroups = [];
    this.firstGroupOfSeats = [];
    this.secondGroupOfSeats = [];
    this.firstGroupOfSeats = this.generateGroupOfSeats(5, 6, 1);
    this.secondGroupOfSeats = this.generateGroupOfSeats(5, 6, 7);
  }

  generateGroupOfSeats(
    rows: number,
    columns: number,
    startSeatNumber: number
  ): DisplaySeat[] {
    const seatNumbers: DisplaySeat[] = [];
    let offset = 24;

    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < columns; col++) {
        let seatNumber = row * columns + col + startSeatNumber;
        if (startSeatNumber !== 1) seatNumber += offset;
        seatNumbers.push({
          seatNumber,
          status: 'available',
          studentIndex: null,
        });
      }
      offset -= 6;
    }
    return seatNumbers;
  }

  buildNumberOfGroups() {
    this.numberOfGroups.push(this.firstGroupOfSeats);
    if (this.selectedClass?.classroom.numberOfSeats! > 30) {
      this.numberOfGroups.push(this.secondGroupOfSeats);
    }
  }
}
