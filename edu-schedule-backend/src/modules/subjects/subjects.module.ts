import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { University } from '../universities/university.entity';

@Module({
  controllers: [SubjectsController],
  providers: [SubjectsService],
  imports: [TypeOrmModule.forFeature([Subject, University])],
})
export class SubjectsModule {}
