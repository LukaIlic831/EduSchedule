import { Controller, Get, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get('study-program')
  getAllSubjectsByStudyProgramId(
    @Query('studyProgramId') studyProgramId: number,
  ): Promise<Subject[]> {
    return this.subjectsService.getAllSubjectsByStudyProgramId(studyProgramId);
  }

  @Get('university/study-program')
  getAllSubjectsByUniversityIdAndStudyProgramId(
    @Query('universityId') universityId: number,
    @Query('studyProgramId') studyProgramId: number,
  ): Promise<Subject[]> {
    return this.subjectsService.getAllSubjectsByUniversityIdAndStudyProgramId(
      universityId,
      studyProgramId,
    );
  }
}
