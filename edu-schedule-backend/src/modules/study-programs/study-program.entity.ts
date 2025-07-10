import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { University } from '../universities/university.entity';
import { Student } from '../students/student.entity';
import { Subject } from '../subjects/subject.entity';
@Entity('study_programs')
export class StudyProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => University, (university) => university.studyPrograms)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @OneToMany(() => Student, (student) => student.studyProgram)
  students: Student[];

  @OneToMany(() => Subject, (subject) => subject.studyProgram)
  subjects: Subject[];
}
