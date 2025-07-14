import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ClassModel } from './models/class.model';
import { createClassFailure, createClassSuccess } from './class.actions';

export interface ClassState extends EntityState<ClassModel> {
  error: { status: number; message: string } | null;
}

export const classAdapter = createEntityAdapter<ClassModel>();
export const classFeatureKey = 'class';

export const initialState: ClassState = classAdapter.getInitialState({
  error: null,
});

export const classReducer = createReducer(
  initialState,
  on(createClassSuccess, (state, { createdClass }) =>
    classAdapter.addOne(createdClass, { ...state })
  ),
  on(createClassFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
