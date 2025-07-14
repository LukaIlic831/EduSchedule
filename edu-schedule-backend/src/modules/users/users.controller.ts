import { Body, Controller, Param, Put } from '@nestjs/common';
import { University } from '../universities/university.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Put(':userId/university')
  async updateUniversity(
    @Param('userId') userId: number,
    @Body('universityId') universityId: number,
  ): Promise<University> {
    return this.usersService.updateUserUniversity(userId, universityId);
  }
}
