import { Body, Controller, Post } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { createSeatDto } from './dto/create-seat.dto';
import { SeatDto } from './dto/seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}
  @Post('create')
  createSeat(@Body() createSeatDto: createSeatDto): Promise<SeatDto> {
    return this.seatsService.createSeat(createSeatDto);
  }
}
