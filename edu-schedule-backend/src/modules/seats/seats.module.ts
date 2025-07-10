import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './seat.entity';

@Module({
  providers: [SeatsService],
  controllers: [SeatsController],
  imports: [TypeOrmModule.forFeature([Seat])],
})
export class SeatsModule {}
