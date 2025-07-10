import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { ClassesModule } from './modules/classes/classes.module';
import { ClassroomsModule } from './modules/classrooms/classrooms.module';
import { ProfessorsModule } from './modules/professors/professors.module';
import { SeatsModule } from './modules/seats/seats.module';
import { StudyProgramsModule } from './modules/study-programs/study-programs.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    StudentsModule,
    ClassesModule,
    ClassroomsModule,
    ProfessorsModule,
    SeatsModule,
    StudyProgramsModule,
    SubjectsModule,
    UniversitiesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
