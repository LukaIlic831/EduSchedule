import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from '../universities/university.entity';
import { Professor } from '../professors/professor.entity';
import { Student } from '../students/student.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @ManyToOne(() => University, (university) => university.users)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
