import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { authFeatureKey } from './state/auth/auth.selectors';
import { authReducer } from './state/auth/auth.reducer';
import { provideHttpClient } from '@angular/common/http';
import { EducationDataEffects } from './state/education-data/education-data.effects';
import { educationDataReducer } from './state/education-data/education-data.reducer';
import { educationDataFeatureKey } from './state/education-data/education-data.selectors';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNativeDateAdapter(),
    provideStore(),
    provideEffects([AuthEffects, EducationDataEffects]),
    provideState({ name: authFeatureKey, reducer: authReducer }),
    provideState({
      name: educationDataFeatureKey,
      reducer: educationDataReducer,
    }),
  ],
};
