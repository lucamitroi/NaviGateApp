import { createReducer, on } from '@ngrx/store';
import { setScreen, setAllShips, showMobileMenu } from './app.actions';
import { Ship } from '../model/data.type';

export const initialScreen: string = 'no-ship';
export const initialStateMenu: boolean = false;
export const initialStateListOfAllShips: Ship[] = [];

// Reducer that handles what screen is loaded based on what buttons were pressed
export const setScreenReducer = createReducer(
  initialScreen,
  on(setScreen, (_, { screen }) => {
    return screen;
  })
);

// Reducer used to store all the ship informations from a user to prevent unnecessary 
// requests to the database
export const setListOfAllShipsReducer = createReducer(
  initialStateListOfAllShips,
  on(setAllShips, (_, { listOfAllShips }) => {
    return listOfAllShips;
  })
);

// Reducer used to hide or show the menu if the application is in mobile resolution
export const setMobileMenuReducer = createReducer(
  initialStateMenu,
  on(showMobileMenu, (state) => !state)
);

// Reducer used to hide or show the menu if the application is in mobile resolution
export const retriggerAnimationReducer = createReducer(
  initialStateMenu,
  on(showMobileMenu, (state) => !state)
);

