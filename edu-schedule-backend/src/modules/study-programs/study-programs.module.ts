import { Module } from '@nestjs/common';
import { StudyProgramsService } from './study-programs.service';
import { StudyProgramsController } from './study-programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyProgram } from './study-program.entity';

@Module({
  providers: [StudyProgramsService],
  controllers: [StudyProgramsController],
  imports: [TypeOrmModule.forFeature([StudyProgram])],
})
export class StudyProgramsModule {}
