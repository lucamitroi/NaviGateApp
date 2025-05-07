import { createAction, props } from '@ngrx/store';
import { Ship } from '../model/data.type';

// Action that handles what screen is loaded based on what buttons were pressed
export const setScreen = createAction(
    '[UI] setScreen',
    props<{ screen: string }>()
);

// Action used to store all the ship informations from a user to prevent unnecessary 
// requests to the database
export const setAllShips = createAction(
    '[GET] setAllShips',
    props<{ listOfAllShips: Ship[] }>()
);

// Action used to hide or show the menu if the application is in mobile resolution
export const showMobileMenu = createAction(
    '[UI] showMobileMenu'
);
