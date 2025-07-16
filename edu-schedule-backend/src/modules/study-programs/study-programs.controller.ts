import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudyProgramsService } from './study-programs.service';
import { StudyProgram } from './study-program.entity';

@Controller('study-programs')
export class StudyProgramsController {
  constructor(private readonly studyProgramsService: StudyProgramsService) {}

  @Get('university/year')
  getStudyProgramsByUniversityIdAndYear(
    @Query('universityId') universityId: number,
    @Query('year') year: number,
  ): Promise<StudyProgram[]> {
    return this.studyProgramsService.getStudyProgramsByUniversityIdAndYear(
      universityId,
      year,
    );
  }

  @Get('university')
  getStudyProgramsByUniversityId(
    @Query('universityId') universityId: number,
  ): Promise<StudyProgram[]> {
    return this.studyProgramsService.getStudyProgramsByUniversityId(
      universityId,
    );
  }
}
