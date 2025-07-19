import { Body, Controller, Post, Query } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @Post('create')
  createStudent(
    @Body() CreateStudentDto: CreateStudentDto,
    @Query('universityId') universityId: number,
    @Query('userId') userId: number,
  ) {
    return this.studentsService.createStudent(CreateStudentDto, universityId, userId);
  }
}
