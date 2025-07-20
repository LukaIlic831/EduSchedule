import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
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

  @Delete('delete-seats')
  deleteClassSeats(@Body() reservedSeatIds: number[]): Promise<void> {
    return this.seatsService.deleteClassSeats(reservedSeatIds);
  }

  @Delete('delete')
  deleteSeat(
    @Query('seatId') seatId: number,
    @Query('classId') classId: number,
  ): Promise<number> {
    return this.seatsService.deleteSeat(seatId, classId);
  }
}
