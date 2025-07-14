import { Controller, Get, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './classroom.entity';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}
  @Get('university')
  getClassroomsByUniversityId(
    @Query('universityId') universityId: number,
  ): Promise<Classroom[]> {
    return this.classroomsService.getClassroomsByUniversityId(universityId);
  }
}
