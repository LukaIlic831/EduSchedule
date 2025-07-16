import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyProgram } from './study-program.entity';
import { Not, Repository } from 'typeorm';
import { University } from '../universities/university.entity';

@Injectable()
export class StudyProgramsService {
  constructor(
    @InjectRepository(StudyProgram)
    private readonly studyProgramRepository: Repository<StudyProgram>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async getStudyProgramsByUniversityId(
    universityId: number,
  ): Promise<StudyProgram[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    return this.studyProgramRepository.find({
      where: {
        university: university,
      },
    });
  }

  async getStudyProgramsByUniversityIdAndYear(
    universityId: number,
    year: number,
  ): Promise<StudyProgram[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    if (Number(year) === 1) {
      return this.studyProgramRepository.find({
        where: {
          university: university,
          name: 'opsti',
        },
      });
    } else {
      return this.studyProgramRepository.find({
        where: {
          university: university,
          name: Not('opsti'),
        },
      });
    }
  }
}
