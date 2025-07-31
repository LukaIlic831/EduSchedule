import { Seat } from '../../education-data/models/seat.model';
import { ClassFormData } from '../formdata/class.formdata';
import { ClassModel } from '../models/class.model';

export interface CreateClassPayload {
  classForCreate: ClassFormData;
}

export interface UpdateClassPayload {
  classForUpdate: ClassFormData;
  reservedSeatsIds: number[];
}
export interface CreateClassSuccessPayload {
  createdClass: ClassModel;
}

export interface UpdateClassSuccessPayload {
  updatedClass: ClassModel;
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
  classId: number;
}

export interface SelectProfessorClassForEditPayload {
  classId: number;
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

export interface CancelReservedSeatPayload {
  seatId: number;
  classId: number;
}

export interface CancelReservedSeatSuccessPayload {
  canceledSeatId: number;
}

export interface LoadClassesWithStudentReservedSeatPayload {
  userId: number;
  index: number;
}
export interface LoadClassesWithStudentReservedSeatSuccessPayload {
  classes: ClassModel[];
}
