import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),

    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }), // Toastr providers
    provideHttpClient(),
  ]
};
