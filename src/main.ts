import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('🔹 Bootstrapping Angular App...');

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('✅ Angular App Bootstrapped Successfully'))
  .catch((err) => console.error('❌ Error Bootstrapping Angular App:', err));
