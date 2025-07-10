import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Classroom } from "../classrooms/classroom.entity";
import { Professor } from "../professors/professor.entity";
import { Subject } from '../subjects/subject.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lecture_title' })
  lectureTitle: string;

  @Column({ name: 'lecture_desc', nullable: true })
  lectureDesc: string;

  @Column({ name: 'start_time', type: 'timestamp' })
  startTime: Date;

  @Column({ name: 'end_time', type: 'timestamp' })
  endTime: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.classes)
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @ManyToOne(() => Subject, (subject) => subject.classes)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @ManyToOne(() => Professor, (professor) => professor.classes)
  @JoinColumn({ name: 'professor_id' })
  professor: Professor;
}