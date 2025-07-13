import { Module } from '@nestjs/common';
import { UniversitiesController } from './universities.controller';
import { UniversitiesService } from './universities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from './university.entity';

@Module({
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  imports: [TypeOrmModule.forFeature([University])],
  exports:[UniversitiesService]
})
export class UniversitiesModule {}
