import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Classroom } from '../classrooms/classroom.entity';
import { Professor } from '../professors/professor.entity';
import { University } from '../universities/university.entity';
import { Subject } from '../subjects/subject.entity';
import { StudyProgram } from '../study-programs/study-program.entity';
import { SeatsModule } from '../seats/seats.module';

@Module({
  providers: [ClassesService],
  controllers: [ClassesController],
  imports: [
    TypeOrmModule.forFeature([
      Class,
      Classroom,
      Subject,
      Professor,
      University,
      StudyProgram
    ]),
    SeatsModule
  ],
})
export class ClassesModule {}
