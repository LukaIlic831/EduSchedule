import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from './professor.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createProfessor(
    createProfessorDto: CreateProfessorDto,
    userId: number,
  ): Promise<Professor> {
    const { title } = createProfessorDto;
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) throw new NotFoundException('User not found');
    const professor = this.professorRepository.create({
      title: title,
      user,
    });
    await this.professorRepository.save(professor);
    return professor;
  }
}
