import { Routes } from '@angular/router';
import { SignInPageComponent } from './feature/auth/pages/sign-in-page/sign-in-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInPageComponent },
];
