import { Controller, Get } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { University } from './university.entity';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Get()
  getAllUniversities(): Promise<University[]> {
    return this.universitiesService.getAllUniversities();
  }
}
