import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ClassModel } from '../../../../state/class/models/class.model';
import { Seat } from '../../../../state/education-data/models/seat.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Student } from '../../../../state/auth/models/student.model';
import { notZeroOrNullValidator } from '../../../../validators/not-zero-or-null.validator';
import {
  cancelReservedSeat,
  reserveSeatInClass,
} from '../../../../state/class/class.actions';
import { selectSelectedClass } from '../../../../state/class/class.selectors';
import { ReserveLegendComponent } from './reserve-legend/reserve-legend.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ClassReserveDetailsComponent } from './class-reserve-details/class-reserve-details.component';
import { filter, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-reserve-seat',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReserveLegendComponent,
    ClassReserveDetailsComponent,
  ],
  templateUrl: './reserve-seat.component.html',
  styleUrl: './reserve-seat.component.scss',
})
export class ReserveSeatComponent implements OnInit {
  reserveSeatForm: FormGroup;
  firstGroupOfSeats: Seat[] = [];
  secondGroupOfSeats: Seat[] = [];
  numberOfGroups: Seat[][] = [];
  selectedClass: Observable<ClassModel | null> = of(null);
  @Input() isProfessor!: boolean;
  @Input() currentStudent: Student | null = null;
  destroyRef = inject(DestroyRef);

  constructor(private store: Store, private fb: FormBuilder) {
    this.reserveSeatForm = this.fb.group({
      seatNumber: [0, notZeroOrNullValidator()],
    });
  }

  ngOnInit() {
    this.selectedClass = this.store.select(selectSelectedClass).pipe(
      filter((selectedClass) => !!selectedClass),
      tap((selectedClass) => {
        this.initializeGroups();
        this.updateGroups(selectedClass);
        this.updateStatus(selectedClass);
        this.buildNumberOfGroups(selectedClass);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  updateGroups(selectedClass: ClassModel) {
    if (selectedClass?.classroom.numberOfSeats! > 30) {
      this.secondGroupOfSeats.forEach(
        (num, index) =>
          (this.firstGroupOfSeats[index] = {
            ...this.firstGroupOfSeats[index],
            numberOfSeat: num.numberOfSeat - 6,
          })
      );
    }
  }

  updateStatus(selectedClass: ClassModel) {
    const reservedSeats = selectedClass.reservedSeats!;
    this.firstGroupOfSeats = this.setSeatsStatusAndIndex(
      this.firstGroupOfSeats,
      reservedSeats
    );

    selectedClass.classroom.numberOfSeats! > 30 &&
      (this.secondGroupOfSeats = this.setSeatsStatusAndIndex(
        this.secondGroupOfSeats,
        reservedSeats
      ));
  }

  setSeatsStatusAndIndex(GroupOfSeats: Seat[], reservedSeats: Seat[]): Seat[] {
    return GroupOfSeats.map((seat) => ({
      ...seat,
      id:
        reservedSeats!.find((s) => s.numberOfSeat === seat.numberOfSeat)?.id ??
        0,
      status: reservedSeats!.find((s) => s.numberOfSeat === seat.numberOfSeat)
        ? 'reserved'
        : 'available',
      studentIndex:
        reservedSeats!.find((s) => s.numberOfSeat === seat.numberOfSeat)
          ?.studentIndex ?? 0,
    }));
  }

  selectSeat(selectedSeat: Seat) {
    this.reserveSeatForm.patchValue({ seatNumber: selectedSeat.numberOfSeat });
    this.numberOfGroups = this.numberOfGroups.map((group) =>
      group.map((seat) => {
        if (seat.status === 'reserved') return seat;
        if (seat.numberOfSeat === selectedSeat.numberOfSeat) {
          return { ...seat, status: 'selected' };
        }

        return { ...seat, status: 'available' };
      })
    );
  }

  onSubmit(event: SubmitEvent, selectedClass: ClassModel): void {
    const clickedButton = event.submitter as HTMLButtonElement;
    const buttonAction = clickedButton.value;

    buttonAction === 'confirm'
      ? this.confirmSeatReservation(selectedClass)
      : this.cancelYourSeatReservation(selectedClass);
  }

  showButtons() {
    return (
      this.reserveSeatForm.get('seatNumber')?.valid ||
      this.isThisClassReservedByThisUser()
    );
  }

  confirmSeatReservation(selectedClass: ClassModel) {
    const { seatNumber } = this.reserveSeatForm.value;
    this.store.dispatch(
      reserveSeatInClass({
        seatForReservation: {
          numberOfSeat: seatNumber,
          classroomId: selectedClass.classroom.id!,
          studentIndex: this.currentStudent?.index!,
          userId: this.currentStudent?.userId!,
          classId: selectedClass.id!,
        },
      })
    );
  }

  cancelYourSeatReservation(selectedClass: ClassModel) {
    this.reserveSeatForm.get('seatNumber')?.reset();
    const reservedSeat = this.findCurrentStudentReservedSeat();
    this.store.dispatch(
      cancelReservedSeat({
        seatId: reservedSeat?.id!,
        classId: selectedClass.id!,
      })
    );
  }

  isThisClassReservedByThisUser(): boolean {
    return !!this.findCurrentStudentReservedSeat();
  }

  findCurrentStudentReservedSeat(): Seat | undefined {
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
  ): Seat[] {
    const seatNumbers: Seat[] = [];
    let offset = 24;

    for (let row = rows - 1; row >= 0; row--) {
      for (let col = 0; col < columns; col++) {
        let seatNumber = row * columns + col + startSeatNumber;
        if (startSeatNumber !== 1) seatNumber += offset;
        seatNumbers.push({
          id: 0,
          numberOfSeat: seatNumber,
          status: 'available',
          studentIndex: 0,
        });
      }
      offset -= 6;
    }
    return seatNumbers;
  }

  buildNumberOfGroups(selectedClass: ClassModel) {
    this.numberOfGroups.push(this.firstGroupOfSeats);
    if (selectedClass.classroom.numberOfSeats! > 30) {
      this.numberOfGroups.push(this.secondGroupOfSeats);
    }
  }
}
