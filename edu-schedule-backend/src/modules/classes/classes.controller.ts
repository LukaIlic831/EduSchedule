import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './class.entity';
import { ClassDto } from './dto/class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  async createClass(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
    return this.classesService.createClass(createClassDto);
  }

  @Get('professor')
  getClassesByProfessorId(
    @Query('professorId') professorId: number,
  ): Promise<ClassDto[]> {
    return this.classesService.findAllByProfessorId(professorId);
  }

  @Get('university/study-program')
  getClassesByStudyProgramId(
    @Query('universityId') universityId: number,
        @Query('studyProgramId') studyProgramId: number,
  ): Promise<ClassDto[]> {
    return this.classesService.findAllByUniversityIdAndStudyProgram(universityId, studyProgramId);
  }

  @Delete('delete')
  deleteClassById(@Query('classId') classId: number): Promise<void> {
    return this.classesService.deleteClassById(classId);
  }

  @Get('class')
  getClassById(@Query('classId') classId: number): Promise<ClassDto> {
    return this.classesService.findByClassId(classId);
  }
}
