import { Injectable } from '@nestjs/common';
import { University } from './university.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UniversitiesService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  getAllUniversities(): Promise<University[]> {
    return this.universityRepository.find();
  }
}
