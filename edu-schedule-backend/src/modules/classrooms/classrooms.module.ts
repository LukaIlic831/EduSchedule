import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsController } from './classrooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from './classroom.entity';

@Module({
  providers: [ClassroomsService],
  controllers: [ClassroomsController],
  imports: [TypeOrmModule.forFeature([Classroom])],
})
export class ClassroomsModule {}
