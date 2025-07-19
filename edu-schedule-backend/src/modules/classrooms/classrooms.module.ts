import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';
import { University } from '../universities/university.entity';

@Module({
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
  imports: [TypeOrmModule.forFeature([Classroom, University])],
})
export class ClassroomsModule {}
