import { Body, Controller, Post, Query } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}
  @Post('create')
  createProfessor(
    @Body() createProfessorDto: CreateProfessorDto,
    @Query('userId') userId: number,
  ) {
    return this.professorsService.createProfessor(
      createProfessorDto,
      userId,
    );
  }
}
