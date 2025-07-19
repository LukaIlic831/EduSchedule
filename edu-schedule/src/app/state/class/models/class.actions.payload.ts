import { Seat } from '../../education-data/models/seat.model';
import { ClassModel } from './class.model';

export interface CreateClassPayload {
  classForCreate: {
    lectureTitle: string;
    lectureDesc: string;
    startTime: string;
    endTime: string;
    classroomId: number;
    subjectId: number;
    professorId: number;
    universityId: number;
  };
}

export interface CreateClassSuccessPayload {
  createdClass: ClassModel;
}

export interface LoadProfessorClassesPayload {
  professorId: number;
}

export interface LoadProfessorClassesSuccessPayload {
  classes: ClassModel[];
}

export interface DeleteProfessorClassPayload {
  classId: number;
  reservedSeatsIds: number[];
}

export interface SelectProfessorClassForDeletePayload {
  selectedClass: ClassModel;
}

export interface LoadClassByClassIdPayload {
  classId: number;
}

export interface LoadClassByClassIdSuccessPayload {
  loadedClass: ClassModel;
}

export interface LoadUniversityClassesPayload {
  universityId: number;
  studyProgramId: number;
}

export interface LoadUniversityClassesSuccessPayload {
  classes: ClassModel[];
}

export interface SetSearchQueryPayload {
  searchQuery: string;
}

export interface SetSelectedYearPayload {
  selectedYear: number;
}

export interface SetSelectedSubjectPayload {
  selectedSubjectId: number;
}

export interface ReserveSeatInClassPayload {
  seatForReservation: {
    numberOfSeat: number;
    classroomId: number;
    studentIndex: number;
    userId: number;
    classId: number;
  };
}

export interface ReserveSeatInClassSuccessPayload {
  reservedSeat: Seat;
}

export interface ClassFailurePayload {
  error: { status: number; message: string };
}
