import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyProgram } from './study-program.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudyProgramsService {
  constructor(
    @InjectRepository(StudyProgram)
    private readonly studyProgramRepository: Repository<StudyProgram>,
  ) {}

  getStudyProgramsByUniversityId(
    universityId: number,
  ): Promise<StudyProgram[]> {
    return this.studyProgramRepository.find({
      where: {
        university: {
          id: universityId,
        },
      },
    });
  }
}
