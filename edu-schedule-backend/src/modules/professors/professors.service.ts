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
    private readonly professorRepo: Repository<Professor>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createProfessor(
    createProfessorDto: CreateProfessorDto,
  ): Promise<Professor> {
    const { title, userId } = createProfessorDto;
    const user = await this.userRepo.findOneBy({
      id: userId,
    });
    if (!user) throw new NotFoundException('User not found');
    const professor = this.professorRepo.create({
      title: title,
      user,
    });
    await this.professorRepo.save(professor);
    return professor;
  }
}
