import { Controller, Get, Query } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './classroom.entity';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}
  @Get('university')
  getAllClassroomsByUniversityId(
    @Query('universityId') universityId: number,
  ): Promise<Classroom[]> {
    return this.classroomsService.getAllClassroomsByUniversityId(universityId);
  }
}
