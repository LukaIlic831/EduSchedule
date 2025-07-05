import { Routes } from '@angular/router';
import { SignInPageComponent } from './feature/auth/pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './feature/auth/pages/sign-up-page/sign-up-page.component';
import { ProfessorInfoPageComponent } from './feature/user-info/pages/professor-info-page/professor-info-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'professor-info', component: ProfessorInfoPageComponent },
];
