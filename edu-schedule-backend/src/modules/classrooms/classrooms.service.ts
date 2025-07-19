import { HttpStatus, Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from '../universities/university.entity';
import { AppException } from 'src/app-exception/app-exception';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}
  async getAllClassroomsByUniversityId(
    universityId: number,
  ): Promise<Classroom[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new AppException('University not found', HttpStatus.NOT_FOUND);
    }
    const classrooms = await this.classroomRepository.find({
      where: {
        university,
      },
    });
    return classrooms;
  }
}
