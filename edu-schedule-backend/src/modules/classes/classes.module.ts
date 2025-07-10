import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';

@Module({
  providers: [ClassesService],
  controllers: [ClassesController],
  imports:[TypeOrmModule.forFeature([Class])]
})
export class ClassesModule {}
