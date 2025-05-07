export type UserRegister = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
}

export type Voyage = {
    voyageId: number;
    voyageDate: Date; 
    voyageDeparturePort: string;
    voyageDeparturePortId: number;
    voyageArrivalPort: string;
    voyageArrivalPortId: number;
    voyageStart: Date; 
    voyageEnd: Date;
};

export type Port = {
    portId: number;
    portName: string;
    portCountry: string;
};

type Country = {
    countryId: number;
    countryName: string;
}

export type Ship = {
    shipId: number;
    userId: number;
    shipName: string;
    maxSpeed: number;
    listOfVoyages: Voyage[];
    listOfPorts: Port[];
    listOfCountries: Country[];
}

export type ShipToPost = {
    userId: number;
    shipName: string;
    maxSpeed: number;
}