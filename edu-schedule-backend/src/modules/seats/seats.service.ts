import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from './seat.entity';
import { Repository } from 'typeorm';
import { Student } from '../students/student.entity';
import { Classroom } from '../classrooms/classroom.entity';
import { createSeatDto } from './dto/create-seat.dto';
import { SeatDto } from './dto/seat.dto';
import { AppException } from 'src/app-exception/app-exception';
import { Class } from '../classes/class.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Student)
    private readonly StudentRepository: Repository<Student>,
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    @InjectRepository(Class)
    private readonly ClassRepository: Repository<Class>,
  ) {}

  async createSeat(createSeatDto: createSeatDto): Promise<SeatDto> {
    const { classroomId, studentIndex, numberOfSeat, userId, classId } =
      createSeatDto;
    const classroom = await this.classroomRepository.findOneBy({
      id: classroomId,
    });
    const student = await this.StudentRepository.findOneBy({
      index: studentIndex,
      userId: userId,
    });
    const foundClass = await this.ClassRepository.findOneBy({
      id: classId,
    });
    if (!classroom || !foundClass || !student) {
      throw new AppException(
        'One or more related entities not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const reservedSeat = this.seatRepository.create({
      classroom,
      numberOfSeat,
      student,
      class: foundClass,
    });
    await this.seatRepository.save(reservedSeat);
    await this.ClassRepository.decrement(
      { id: foundClass.id },
      'availableSeats',
      1,
    );
    return {
      id: reservedSeat.id,
      numberOfSeat: reservedSeat.numberOfSeat,
      studentIndex: reservedSeat.student.index,
    };
  }

  async deleteClassSeats(reservedSeatIds: number[]): Promise<void> {
    reservedSeatIds.length > 0 &&
      (await this.seatRepository.delete(reservedSeatIds));
  }

  async deleteSeat(seatId: number, classId: number): Promise<number> {
    const foundClass = await this.ClassRepository.findOneBy({
      id: classId,
    });
    if (!foundClass) {
      throw new AppException('Class not found', HttpStatus.NOT_FOUND);
    }
    await this.seatRepository.delete(seatId);
    await this.ClassRepository.increment(
      { id: foundClass.id },
      'availableSeats',
      1,
    );
    return seatId;
  }
}
