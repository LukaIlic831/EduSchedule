import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyProgram } from "../study-programs/study-program.entity";
import { Class } from "../classes/class.entity";

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => StudyProgram, (studyProgram) => studyProgram.subjects)
  @JoinColumn({ name: 'study_program_id' })
  studyProgram: StudyProgram;

  @OneToMany(() => Class, (cls) => cls.subject)
  classes: Class[];
}