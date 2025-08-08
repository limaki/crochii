import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {  withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes'; 
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // siempre sube al inicio
        anchorScrolling: 'enabled'        // soporta #anclas
      })), 
  ]
});
