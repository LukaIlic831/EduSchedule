import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { University } from '../universities/university.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService],
  imports: [TypeOrmModule.forFeature([User, University])],
})
export class UsersModule {}
