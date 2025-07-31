import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { In, MoreThan, Repository } from 'typeorm';
import { Classroom } from '../classrooms/classroom.entity';
import { Subject } from '../subjects/subject.entity';
import { Professor } from '../professors/professor.entity';
import { University } from '../universities/university.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { AppException } from 'src/app-exception/app-exception';
import { ClassDto } from './dto/class.dto';
import { StudyProgram } from '../study-programs/study-program.entity';
import { UpdateClassDto } from './dto/update-class.dto';
import { SeatsService } from '../seats/seats.service';

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
    @InjectRepository(StudyProgram)
    private studyProgramRepository: Repository<StudyProgram>,
    private readonly seatsService: SeatsService,
  ) {}

  async findByClassId(classId: number): Promise<ClassDto> {
    const foundClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: [
        'reservedSeats',
        'reservedSeats.student',
        'classroom',
        'subject.studyProgram',
        'professor.user',
        'university',
      ],
    });

    if (!foundClass) {
      throw new AppException('Class not found', HttpStatus.NOT_FOUND);
    }
    return {
      ...foundClass,
      professor: {
        id: foundClass.professor.id,
        title: foundClass.professor.title,
        username: foundClass.professor.user.username,
      },
      reservedSeats: foundClass.reservedSeats.map((seat) => ({
        id: seat.id,
        numberOfSeat: seat.numberOfSeat,
        studentIndex: seat.student.index,
      })),
    };
  }

  async deleteClassById(classId: number): Promise<void> {
    await this.classRepository.delete(classId);
  }

  async getAllClassesByProfessorId(professorId: number): Promise<ClassDto[]> {
    const professor = await this.professorRepository.findOneBy({
      id: professorId,
    });
    if (!professor) {
      throw new AppException('Professor not found', HttpStatus.NOT_FOUND);
    }
    const classes = await this.classRepository.find({
      where: { professor: professor, startTime: MoreThan(new Date()) },
      relations: [
        'reservedSeats',
        'reservedSeats.student',
        'subject.studyProgram',
        'professor.user',
        'university',
        'classroom',
      ],
    });

    return classes.map((cls) => ({
      ...cls,
      professor: {
        id: cls.professor.id,
        title: cls.professor.title,
        username: cls.professor.user.username,
      },
      reservedSeats: cls.reservedSeats.map((seat) => ({
        id: seat.id,
        numberOfSeat: seat.numberOfSeat,
        studentIndex: seat.student.index,
      })),
    }));
  }

  async getAllUniversityClassesByStudyProgramId(
    universityId: number,
    studyProgramId: number,
  ): Promise<ClassDto[]> {
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });
    const studyProgram = await this.studyProgramRepository.findOneBy({
      id: studyProgramId,
    });
    if (!university) {
      throw new AppException('University not found', HttpStatus.NOT_FOUND);
    }
    if (!studyProgram) {
      throw new AppException('Study Program not found', HttpStatus.NOT_FOUND);
    }

    const studyProgramOpsti = await this.studyProgramRepository.findOneBy({
      university: university,
      name: 'opsti',
    });

    if (!studyProgramOpsti) {
      throw new AppException(
        'Study Program Opsti not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const studyPrograms = [studyProgram.id, studyProgramOpsti.id];

    const classes = await this.classRepository.find({
      where: {
        university: university,
        subject: { studyProgram: In(studyPrograms) },
        startTime: MoreThan(new Date()),
      },
      relations: [
        'reservedSeats',
        'reservedSeats.student',
        'subject.studyProgram',
        'professor.user',
        'university',
        'classroom',
      ],
    });

    return classes.map((cls) => ({
      ...cls,
      professor: {
        id: cls.professor.id,
        title: cls.professor.title,
        username: cls.professor.user.username,
      },
      reservedSeats: cls.reservedSeats.map((seat) => ({
        id: seat.id,
        numberOfSeat: seat.numberOfSeat,
        studentIndex: seat.student.index,
      })),
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
    } = createClassDto.classForCreate;
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
      throw new AppException(
        'One or more related entities not found',
        HttpStatus.NOT_FOUND,
      );
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
      availableSeats: classroom.numberOfSeats,
    });

    await this.classRepository.save(newClass);

    return this.findByClassId(newClass.id);
  }

  async updateClass(updateClassDto: UpdateClassDto): Promise<ClassDto> {
    const {
      lectureTitle,
      lectureDesc,
      startTime,
      classroomId,
      subjectId,
      professorId,
      universityId,
      endTime,
      classId,
    } = updateClassDto.classForUpdate;
    const reservedSeatsIds = updateClassDto.reservedSeatsIds;
    const classroom = await this.classroomRepository.findOneBy({
      id: classroomId,
    });
    const subject = await this.subjectRepository.findOne({
      where: { id: subjectId },
      relations: ['studyProgram'],
    });
    const professor = await this.professorRepository.findOneBy({
      id: professorId,
    });
    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });

    if (!classroom || !subject || !professor || !university) {
      throw new AppException(
        'One or more related entities not found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (
      await this.findOverlapingClasses(
        classroomId,
        new Date(endTime),
        new Date(startTime),
        classId!,
      )
    ) {
      throw new AppException(
        'Class overlaps with existing schedule',
        HttpStatus.CONFLICT,
      );
    }

    const existingClass = await this.classRepository.findOneOrFail({
      where: { id: classId },
      relations: ['classroom', 'subject.studyProgram'],
    });
    const classroomChangeRequired = classroom.id !== existingClass.classroom.id;
    const subjectChangeRequired = subject.id !== existingClass.subject.id;
    const studyProgramChangeRequired =
      subject.studyProgram.id !== existingClass.subject.studyProgram.id;
    const changeRequired =
      classroomChangeRequired ||
      subjectChangeRequired ||
      studyProgramChangeRequired;
    changeRequired && this.seatsService.deleteClassSeats(reservedSeatsIds);

    existingClass.lectureTitle = lectureTitle;
    existingClass.lectureDesc = lectureDesc;
    existingClass.startTime = new Date(startTime);
    existingClass.endTime = new Date(endTime);
    ((existingClass.classroom = classroom),
      (existingClass.subject = subject),
      (existingClass.professor = professor),
      (existingClass.university = university),
      (existingClass.availableSeats = changeRequired
        ? classroom.numberOfSeats
        : existingClass.availableSeats));

    await this.classRepository.save(existingClass);
    return this.findByClassId(existingClass.id);
  }

  async getAllClassesWithStudentReservedSeat(
    userId: number,
    index: number,
  ): Promise<ClassDto[]> {
    const classes = await this.classRepository.find({
      where: {
        reservedSeats: {
          student: {
            index,
            userId,
          },
        },
        startTime: MoreThan(new Date()),
      },
      relations: [
        'reservedSeats',
        'reservedSeats.student',
        'subject.studyProgram',
        'professor.user',
        'university',
        'classroom',
      ],
    });
    return classes.map((cls) => ({
      ...cls,
      professor: {
        id: cls.professor.id,
        title: cls.professor.title,
        username: cls.professor.user.username,
      },
      reservedSeats: cls.reservedSeats.map((seat) => ({
        id: seat.id,
        numberOfSeat: seat.numberOfSeat,
        studentIndex: seat.student.index,
      })),
    }));
  }

  async findOverlapingClasses(
    classroomId: number,
    newEndTime: Date,
    newStartTime: Date,
    classId?: number,
  ): Promise<boolean> {
    const currentDate = new Date();
    const overlappingClassesQuery = this.classRepository
      .createQueryBuilder('cls')
      .where('cls.classroom_id = :classroomId', { classroomId: classroomId })
      .andWhere('cls.startTime < :newEnd', { newEnd: newEndTime })
      .andWhere('cls.endTime > :newStart', { newStart: newStartTime })
      .andWhere('cls.startTime > :current', { current: currentDate });
    classId &&
      overlappingClassesQuery.andWhere('cls.id != :classId', { classId });
    const overlappingClassesCount = await overlappingClassesQuery.getCount();
    return overlappingClassesCount > 0;
  }
}
