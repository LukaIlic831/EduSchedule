import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { StudyProgram } from '../study-programs/study-program.entity';
import { Seat } from '../seats/seat.entity';

@Entity('students')
export class Student {
  @PrimaryColumn()
  index: number;

  @PrimaryColumn()
  user_id: number;

  @Column()
  year: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => StudyProgram, (studyProgram) => studyProgram.students)
  @JoinColumn({ name: 'study_program_id' })
  studyProgram: StudyProgram;

  @OneToMany(() => Seat, (seat) => seat.student)
  reservedSeats: Seat[];
}
