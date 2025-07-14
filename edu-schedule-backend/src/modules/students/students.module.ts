import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';
import { StudyProgram } from '../study-programs/study-program.entity';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [TypeOrmModule.forFeature([Student, User, StudyProgram])],
})
export class StudentsModule {}
