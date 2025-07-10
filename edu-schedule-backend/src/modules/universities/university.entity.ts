import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { StudyProgram } from "../study-programs/study-program.entity";
import { Classroom } from "../classrooms/classroom.entity";

@Entity('universities')
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.university)
  users: User[];

  @OneToMany(() => StudyProgram, (studyProgram) => studyProgram.university)
  studyPrograms: StudyProgram[];

  @OneToMany(() => Classroom, (classroom) => classroom.university)
  classrooms: Classroom[];
}