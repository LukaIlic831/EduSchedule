import { User } from '../../state/auth/models/user.model';

export interface authUser {
  user: User;
  token: string;
}
