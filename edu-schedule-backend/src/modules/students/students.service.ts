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
    const { index, userId, studyProgramId, year, universityId } = createStudentDto;
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['university'],
    });

    const program = await this.programRepo.findOneBy({
      id: studyProgramId,
    });
    if (!user) throw new NotFoundException('User not found');
    if (!program) throw new NotFoundException('Study program not found');

    const existingStudent = await this.findByIndexAndUniversity(
      index,
      universityId,
    );
    if (existingStudent) {
      throw new AppException(
        'Student with that index already exists at this university',
        HttpStatus.CONFLICT,
      );
    }

    const student = this.studentRepo.create({
      index,
      year,
      user,
      studyProgram: program,
    });

    await this.studentRepo.save(student);
    return student;
  }

  async findByIndexAndUniversity(
    index: number,
    universityId: number,
  ): Promise<Student | null> {
    return this.studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.user', 'user')
      .leftJoin('user.university', 'university')
      .where('student.index = :index', { index })
      .andWhere('university.id = :universityId', { universityId })
      .getOne();
  }
}
