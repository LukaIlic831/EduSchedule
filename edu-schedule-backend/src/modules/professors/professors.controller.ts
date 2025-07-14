import { Body, Controller, Post } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Controller('professors')
export class ProfessorsController {
  constructor(private professorsService: ProfessorsService) {}
  @Post('create')
  async createProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    return this.professorsService.createProfessor(createProfessorDto);
  }
}
