import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';
import { StudyProgram } from '../study-programs/study-program.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { AppException } from 'src/app-exception/app-exception';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(StudyProgram)
    private readonly programRepo: Repository<StudyProgram>,
  ) {}

  async findByIndex(index: number): Promise<Student | null> {
    return this.studentRepo.findOne({ where: { index } });
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { index, userId, studyProgramId, year } = createStudentDto;
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const program = await this.programRepo.findOneBy({
      id: studyProgramId,
    });
    if (!program) throw new NotFoundException('Study program not found');

    const userWithSameIndex = await this.findByIndex(index);
    if (userWithSameIndex)
      throw new AppException(
        'User with that index already exists',
        HttpStatus.CONFLICT,
      );

    const student = this.studentRepo.create({
      index: index,
      year: year,
      user,
      studyProgram: program,
    });

    await this.studentRepo.save(student);
    return student;
  }
}
