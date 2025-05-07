import { Ship } from "../model/data.type";

export interface AppState {
    screenValue: string;
    listOfAllShips: Ship[];
    showMenu: boolean;
    addShipBool: boolean;
}