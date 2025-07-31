import { ClassFormData } from '../formdata/class.formdata';

export interface UpdateClassDto {
  classForUpdate: ClassFormData;
  reservedSeatsIds: number[];
}
