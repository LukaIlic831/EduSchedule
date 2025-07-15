import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { University } from '../universities/university.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
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

  async getSubjectsByUniversityId(universityId: number): Promise<Subject[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    return this.subjectRepository.find({
      where: {
        studyProgram: {
          university: university,
        },
      },
    });
  }
}
