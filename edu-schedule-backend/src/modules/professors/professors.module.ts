import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { User } from '../users/user.entity';

@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService],
  imports: [TypeOrmModule.forFeature([Professor, User])],
})
export class ProfessorsModule {}
