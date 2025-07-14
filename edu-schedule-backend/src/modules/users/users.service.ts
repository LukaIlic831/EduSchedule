import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { AppException } from 'src/app-exception/app-exception';
import { University } from '../universities/university.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(userId: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['university', 'professor', 'student', 'student.studyProgram'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;

    if (await this.findByUsername(username)) {
      throw new AppException('Username already taken', HttpStatus.CONFLICT);
    }

    if (await this.findByEmail(email)) {
      throw new AppException('Email already taken', HttpStatus.CONFLICT);
    }

    if (password.length < 8) {
      throw new AppException(
        'Password must have at least 8 characters',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    return user;
  }

  async updateUserUniversity(
    userId: number,
    universityId: number,
  ): Promise<University> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['university'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });

    if (!university) {
      throw new NotFoundException('University not found');
    }

    user.university = university;
    await this.userRepository.save(user);

    return university;
  }
}
