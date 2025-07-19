import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyProgram } from './study-program.entity';
import { Not, Repository } from 'typeorm';
import { University } from '../universities/university.entity';
import { AppException } from 'src/app-exception/app-exception';

@Injectable()
export class StudyProgramsService {
  constructor(
    @InjectRepository(StudyProgram)
    private readonly studyProgramRepository: Repository<StudyProgram>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async getAllStudyProgramsByUniversityId(
    universityId: number,
  ): Promise<StudyProgram[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new AppException('University not found', HttpStatus.NOT_FOUND);
    }
    const studyPrograms = await this.studyProgramRepository.find({
      where: {
        university: university,
      },
    });
    return studyPrograms;
  }

  async getAllStudyProgramsByUniversityIdAndYear(
    universityId: number,
    year: number,
  ): Promise<StudyProgram[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new AppException('University not found', HttpStatus.NOT_FOUND);
    }
    let studyPrograms: StudyProgram[] = [];
    if (Number(year) === 1) {
      studyPrograms = await this.studyProgramRepository.find({
        where: {
          university: university,
          name: 'opsti',
        },
      });
    } else {
      studyPrograms = await this.studyProgramRepository.find({
        where: {
          university: university,
          name: Not('opsti'),
        },
      });
    }
    return studyPrograms;
  }
}
