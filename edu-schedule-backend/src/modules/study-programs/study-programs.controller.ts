import { Controller, Get, Query } from '@nestjs/common';
import { StudyProgramsService } from './study-programs.service';
import { StudyProgram } from './study-program.entity';

@Controller('study-programs')
export class StudyProgramsController {
  constructor(private readonly studyProgramsService: StudyProgramsService) {}

  @Get('university/year')
  getAllStudyProgramsByUniversityIdAndYear(
    @Query('universityId') universityId: number,
    @Query('year') year: number,
  ): Promise<StudyProgram[]> {
    return this.studyProgramsService.getAllStudyProgramsByUniversityIdAndYear(
      universityId,
      year,
    );
  }

  @Get('university')
  getAllStudyProgramsByUniversityId(
    @Query('universityId') universityId: number,
  ): Promise<StudyProgram[]> {
    return this.studyProgramsService.getAllStudyProgramsByUniversityId(
      universityId,
    );
  }
}
