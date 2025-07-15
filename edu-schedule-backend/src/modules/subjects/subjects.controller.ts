import { Controller, Get, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get('study-program')
  getSubjectsByStudyProgramId(
    @Query('studyProgramId') studyProgramId: number,
  ): Promise<Subject[]> {
    return this.subjectsService.getSubjectsByStudyProgramId(studyProgramId);
  }

  @Get('university')
  getSubjectsByUniversityId(
    @Query('universityId') universityId: number,
  ): Promise<Subject[]> {
    return this.subjectsService.getSubjectsByUniversityId(universityId);
  }
}
