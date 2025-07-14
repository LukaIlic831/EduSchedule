import { Injectable } from '@nestjs/common';
import { Classroom } from './classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}
  getClassroomsByUniversityId(universityId: number): Promise<Classroom[]> {
    return this.classroomRepository.find({
      where: {
        university: {
          id: universityId,
        },
      },
    });
  }
}
