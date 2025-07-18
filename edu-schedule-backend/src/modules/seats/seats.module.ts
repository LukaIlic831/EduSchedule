import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Student } from '../students/student.entity';
import { Classroom } from '../classrooms/classroom.entity';

@Module({
  providers: [SeatsService],
  controllers: [SeatsController],
  imports: [TypeOrmModule.forFeature([Seat, Student, Classroom])],
})
export class SeatsModule {}
