import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';
import { StudyProgram } from '../study-programs/study-program.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { AppException } from 'src/app-exception/app-exception';
import { University } from '../universities/university.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(StudyProgram)
    private readonly studyProgramRepository: Repository<StudyProgram>,
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async createStudent(
    createStudentDto: CreateStudentDto,
    universityId: number,
    userId: number,
  ): Promise<Student> {
    const { index, studyProgramId, year } = createStudentDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const studyProgram = await this.studyProgramRepository.findOneBy({
      id: studyProgramId,
    });
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university || !user || !studyProgram) {
      throw new AppException(
        'One or more related entities not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const existingStudent = await this.findByIndexAndUniversity(
      index,
      university,
    );
    if (existingStudent) {
      throw new AppException(
        'Student with that index already exists at this university',
        HttpStatus.CONFLICT,
      );
    }

    const student = this.studentRepository.create({
      index,
      year,
      user,
      studyProgram,
    });

    await this.studentRepository.save(student);
    return student;
  }

  async findByIndexAndUniversity(
    index: number,
    university: University,
  ): Promise<Student | null> {
    const student = await this.studentRepository.findOne({
      where: {
        index,
        user: {
          university: university,
        },
      },
      relations: ['user'],
    });
    return student;
  }
}
