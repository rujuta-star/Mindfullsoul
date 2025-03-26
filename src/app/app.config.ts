import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

// Import the missing LoginComponent
import { LoginComponent } from './components/login/login.component';
import { PredictComponent } from './components/predict/predict.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
// import { TherapyComponent } from './components/therapy/therapy.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'predict', component:PredictComponent },

  { path: 'questionnaire', component: QuestionnaireComponent },
  // { path: 'therapy', component: TherapyComponent },
  
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
  ],
};
