export interface Contact {
    contactId:   number;
    user:        User;
    prefix:      string;
    firstName:   string;
    middleName:  string;
    lastName:    string;
    company:     Company;
    enteredBy:   number;
    enteredDate: Date;
    editedBy:    number;
    editedDate:  Date;
    birthDate:   Date;
}

export interface Company {
    companyId:   number;
    active:      boolean;
    companyCode: string;
    companyName: string;
    description: string;
    address1:    string;
    city:        string;
    state:       string;
    zip:         string;
}

export interface User {
    userId:            number;
    active:            boolean;
    position:          Position;
    username:          string;
    password:          string;
    firstName:         string;
    lastName:          string;
    email:             string;
    securityQuestion1: string;
    securityAnswer1:   string;
    securityQuestion2: string;
    securityAnswer2:   string;
    birthDate:         Date;
}

export interface Position {
    positionId:   number;
    active:       boolean;
    positionCode: string;
    description:  string;
}
