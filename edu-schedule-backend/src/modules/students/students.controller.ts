import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}
  @Post('create')
  async createStudent(@Body() CreateStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(CreateStudentDto);
  } 
}
