import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { University } from '../universities/university.entity';
import { StudyProgram } from '../study-programs/study-program.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
    @InjectRepository(StudyProgram)
    private readonly studyProgramRepository: Repository<StudyProgram>,
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

  async getAllSubjectsByUniversityIdAndStudyProgramId(
    universityId: number,
    studyProgramId: number,
  ): Promise<Subject[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    const studyProgram = await this.studyProgramRepository.findOneBy({
      id: studyProgramId,
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    if (!studyProgram) {
      throw new NotFoundException('Study Program not found');
    }

    return this.subjectRepository
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.studyProgram', 'studyProgram')
      .leftJoinAndSelect('studyProgram.university', 'university')
      .where(
        '(studyProgram.id = :studyProgramId OR (studyProgram.name = :opstiName AND university.id = :universityId))',
        {
          studyProgramId: studyProgram.id,
          opstiName: 'opsti',
          universityId: university.id,
        },
      )
      .getMany();
  }
}
