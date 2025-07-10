import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Class } from "../classes/class.entity";

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @OneToMany(() => Class, (cls) => cls.professor)
  classes: Class[];
}