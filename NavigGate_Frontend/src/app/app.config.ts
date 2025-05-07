import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { 
  setScreenReducer, 
  setListOfAllShipsReducer, 
  setMobileMenuReducer,
} from './state/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideAnimations(),
    provideStore({ 
      screenValue: setScreenReducer, 
      listOfAllShips: setListOfAllShipsReducer, 
      showMenu: setMobileMenuReducer,
    }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]

};
