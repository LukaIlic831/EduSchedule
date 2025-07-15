import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Repository } from 'typeorm';
import { Classroom } from '../classrooms/classroom.entity';
import { Subject } from '../subjects/subject.entity';
import { Professor } from '../professors/professor.entity';
import { University } from '../universities/university.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { AppException } from 'src/app-exception/app-exception';
import { ClassDto } from './dto/class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async findByClassId(classId: number): Promise<ClassDto> {
    const foundClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: [
        'classroom',
        'subject.studyProgram',
        'professor.user',
        'university',
      ],
    });

    if (!foundClass) {
      throw new NotFoundException(`Class not found`);
    }
    return {
      ...foundClass,
      professor: {
        id: foundClass.professor.id,
        title: foundClass.professor.title,
        username: foundClass.professor.user.username,
      },
    };
  }

  async deleteClassById(classId: number): Promise<void> {
    await this.classRepository.delete(classId);
  }

  async findAllByProfessorId(professorId: number): Promise<ClassDto[]> {
    const professor = await this.professorRepository.findOneBy({
      id: professorId,
    });
    if (!professor) {
      throw new NotFoundException('Professor not found');
    }
    const classes = await this.classRepository.find({
      where: { professor: professor },
      relations: [
        'classroom',
        'subject.studyProgram',
        'professor.user',
        'university',
      ],
    });

    return classes.map((cls) => ({
      ...cls,
      professor: {
        id: cls.professor.id,
        title: cls.professor.title,
        username: cls.professor.user.username,
      },
    }));
  }

  async findAllByUniversityId(universityId: number): Promise<ClassDto[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    const classes = await this.classRepository.find({
      where: { university: university },
      relations: [
        'classroom',
        'subject.studyProgram',
        'professor.user',
        'university',
      ],
    });

    return classes.map((cls) => ({
      ...cls,
      professor: {
        id: cls.professor.id,
        title: cls.professor.title,
        username: cls.professor.user.username,
      },
    }));
  }

  async createClass(createClassDto: CreateClassDto): Promise<ClassDto> {
    const {
      lectureTitle,
      lectureDesc,
      startTime,
      classroomId,
      subjectId,
      professorId,
      universityId,
      endTime,
    } = createClassDto;
    const classroom = await this.classroomRepository.findOneBy({
      id: classroomId,
    });
    const subject = await this.subjectRepository.findOneBy({ id: subjectId });
    const professor = await this.professorRepository.findOneBy({
      id: professorId,
    });
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });

    if (!classroom || !subject || !professor || !university) {
      throw new NotFoundException('One or more related entities not found.');
    }

    if (
      await this.findOverlapingClasses(
        classroomId,
        new Date(endTime),
        new Date(startTime),
      )
    ) {
      throw new AppException(
        'Class overlaps with existing schedule',
        HttpStatus.CONFLICT,
      );
    }

    const newClass = this.classRepository.create({
      lectureTitle,
      lectureDesc,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      classroom,
      subject,
      professor,
      university,
    });

    await this.classRepository.save(newClass);

    return this.findByClassId(newClass.id);
  }

  async findOverlapingClasses(
    classroomId: number,
    newEndTime: Date,
    newStartTime: Date,
  ): Promise<boolean> {
    const overlappingClasses = await this.classRepository
      .createQueryBuilder('cls')
      .where('cls.classroom_id = :classroomId', { classroomId: classroomId })
      .andWhere('cls.startTime < :newEnd', { newEnd: newEndTime })
      .andWhere('cls.endTime > :newStart', { newStart: newStartTime })
      .getCount();
    return overlappingClasses > 0;
  }
}
