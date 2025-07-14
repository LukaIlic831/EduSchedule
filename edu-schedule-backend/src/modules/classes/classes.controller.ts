import { Body, Controller, Post } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create')
  async createClass(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }
}
