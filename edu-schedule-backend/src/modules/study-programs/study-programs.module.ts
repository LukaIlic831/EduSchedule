import { Module } from '@nestjs/common';
import { StudyProgramsService } from './study-programs.service';
import { StudyProgramsController } from './study-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyProgram } from './study-program.entity';
import { University } from '../universities/university.entity';

@Module({
  providers: [StudyProgramsService],
  controllers: [StudyProgramsController],
  imports: [TypeOrmModule.forFeature([StudyProgram, University])],
})
export class StudyProgramsModule {}
