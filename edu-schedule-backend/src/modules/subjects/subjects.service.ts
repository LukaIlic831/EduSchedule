import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';
import { University } from '../universities/university.entity';
import { StudyProgram } from '../study-programs/study-program.entity';
import { AppException } from 'src/app-exception/app-exception';

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

  async getAllSubjectsByStudyProgramId(
    studyProgramId: number,
  ): Promise<Subject[]> {
    const studyProgram = await this.studyProgramRepository.findOneBy({
      id: studyProgramId,
    });
    if (!studyProgram) {
      throw new AppException('Study Program not found', HttpStatus.NOT_FOUND);
    }
    const subjects = await this.subjectRepository.find({
      where: {
        studyProgram: studyProgram,
      },
    });
    return subjects;
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
      throw new AppException('University not found', HttpStatus.NOT_FOUND);
    }
    if (!studyProgram) {
      throw new AppException('Study Program not found', HttpStatus.NOT_FOUND);
    }

    const subjects = await this.subjectRepository
      .createQueryBuilder('subject')
      .leftJoinAndSelect('subject.studyProgram', 'studyProgram')
      .leftJoinAndSelect('studyProgram.university', 'university')
      .where(
        '(university.id = :universityId AND (studyProgram.id = :studyProgramId OR studyProgram.name = :opstiName))',
        {
          studyProgramId: studyProgram.id,
          opstiName: 'opsti',
          universityId: university.id,
        },
      )
      .getMany();
    return subjects;
  }
}
