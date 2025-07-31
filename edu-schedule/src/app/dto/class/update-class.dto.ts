import { ClassFormData } from '../../state/class/formdata/class.formdata';

export interface UpdateClassDto {
  classForUpdate: ClassFormData;
  reservedSeatsIds: number[];
}
