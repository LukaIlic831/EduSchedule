import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classroom } from '../classrooms/classroom.entity';
import { Student } from '../students/student.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'number_of_seat' })
  numberOfSeat: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.reservedSeats)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @ManyToOne(() => Student, (student) => student.reservedSeats)
  @JoinColumn({ name: 'student_index' })
  student: Student;
}
