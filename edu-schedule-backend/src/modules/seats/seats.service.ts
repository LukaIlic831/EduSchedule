import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';
import { Classroom } from '../classrooms/classroom.entity';
import { createSeatDto } from './dto/create-seat.dto';
import { SeatDto } from './dto/seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Student)
    private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}

  async createSeat(createSeatDto: createSeatDto): Promise<SeatDto> {
    const { classroomId, studentIndex, numberOfSeat, userId } = createSeatDto;
    const classroom = await this.classroomRepository.findOneBy({
      id: classroomId,
    });
    const student = await this.StudentRepository.findOneBy({
      index: studentIndex,
      userId: userId,
    });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    const reservedSeat = this.seatRepository.create({
      classroom,
      numberOfSeat,
      student,
    });
    await this.seatRepository.save(reservedSeat);
    await this.classroomRepository.decrement(
      { id: classroomId },
      'availableSeats',
      1,
    );
    return {
      id: reservedSeat.id,
      numberOfSeat: reservedSeat.numberOfSeat,
      studentIndex: reservedSeat.student.index,
    };
  }
}
