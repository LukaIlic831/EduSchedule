import { UserDto } from 'src/modules/users/dto/user.dto';

export interface AuthUser {
  user: UserDto;
  token: any;
}
