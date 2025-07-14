import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  getSubjectsByStudyProgramId(studyProgramId: number): Promise<Subject[]> {
    return this.subjectRepository.find({
      where: {
        studyProgram: {
          id: studyProgramId,
        },
      },
    });
  }
}
