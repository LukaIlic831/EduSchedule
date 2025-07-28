import { Routes } from '@angular/router';
import { SignInPageComponent } from './feature/auth/pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './feature/auth/pages/sign-up-page/sign-up-page.component';
import { ProfessorInfoPageComponent } from './feature/user-info/pages/professor-info-page/professor-info-page.component';
import { StudentInfoPageComponent } from './feature/user-info/pages/student-info-page/student-info-page.component';
import { ProfessorDashboardPageComponent } from './feature/dashboard/pages/professor-dashboard-page/professor-dashboard-page.component';
import { CreateClassPageComponent } from './feature/create-class/pages/create-class-page/create-class-page.component';
import { SearchClassPageComponent } from './feature/search-class/pages/search-class-page/search-class-page.component';
import { StudentProfilePageComponent } from './feature/profile/pages/student-profile-page/student-profile-page.component';
import { ClassInfoPageComponent } from './feature/class-info/pages/class-info-page/class-info-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { professorGuard } from './guards/professor/professor.guard';
import { studentGuard } from './guards/student/student.guard';
import { infoGuard } from './guards/info-guard/info.guard';
import { authPageGuard } from './guards/auth-page/auth-page.guard';
import { NotFoundComponent } from './core/not-found/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [authPageGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [authPageGuard],
  },
  {
    path: 'professor-info',
    component: ProfessorInfoPageComponent,
    canActivate: [authGuard, infoGuard],
  },
  {
    path: 'student-info',
    component: StudentInfoPageComponent,
    canActivate: [authGuard, infoGuard],
  },
  {
    path: 'professor-dashboard',
    component: ProfessorDashboardPageComponent,
    canActivate: [authGuard, professorGuard],
  },
  {
    path: 'create-class',
    component: CreateClassPageComponent,
    canActivate: [authGuard, professorGuard],
  },
  {
    path: 'search',
    component: SearchClassPageComponent,
    canActivate: [authGuard, studentGuard],
  },
  {
    path: 'student-profile',
    component: StudentProfilePageComponent,
    canActivate: [authGuard, studentGuard],
  },
  {
    path: 'class-info/:id',
    component: ClassInfoPageComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
