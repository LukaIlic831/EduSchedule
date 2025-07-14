import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from '../universities/university.entity';
import { Class } from '../classes/class.entity';
import { Seat } from '../seats/seat.entity';

@Entity('classrooms')
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'number_of_seats' })
  numberOfSeats: number;

  @Column({ name: 'available_seats' })
  availableSeats: number;

  @Column({ name: 'hasProjector' })
  hasProjector: boolean;

  @ManyToOne(() => University, (university) => university.classrooms)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @OneToMany(() => Seat, (seat) => seat.classroom)
  reservedSeats: Seat[];

  @OneToMany(() => Class, (cls) => cls.classroom)
  classes: Class[];
}
