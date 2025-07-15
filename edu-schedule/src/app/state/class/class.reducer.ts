import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ClassModel } from './models/class.model';
import {
  createClassFailure,
  createClassSuccess,
  deleteProfessorClassSuccess,
  loadClassByClassIdSuccess,
  loadProfessorClassesSuccess,
  selectProfessorClassForDelete,
} from './class.actions';

export interface ClassState extends EntityState<ClassModel> {
  error: { status: number; message: string } | null;
  selectedClass: ClassModel | null;
}

export const classAdapter = createEntityAdapter<ClassModel>();

export const initialState: ClassState = classAdapter.getInitialState({
  error: null,
  selectedClass: null,
});

export const classReducer = createReducer(
  initialState,
  on(createClassSuccess, (state, { createdClass }) =>
    classAdapter.addOne(createdClass, { ...state })
  ),
  on(createClassFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(loadProfessorClassesSuccess, (state, { classes }) =>
    classAdapter.setAll(classes, { ...state })
  ),
  on(deleteProfessorClassSuccess, (state) =>
    classAdapter.removeOne(state.selectedClass?.id!, {
      ...state,
      selectedClass: null,
    })
  ),
  on(selectProfessorClassForDelete, (state, { selectedClass }) => ({
    ...state,
    selectedClass,
  })),
  on(loadClassByClassIdSuccess, (state, { loadedClass }) => ({
    ...state,
    selectedClass: loadedClass,
  }))
);
