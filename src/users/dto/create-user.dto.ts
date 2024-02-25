export interface IUser {
    _id?: string; // O _id é opcional, pois será gerado automaticamente pelo MongoDB
    name: string;
    lastname: string;
    birthday: Date;
    email: string;
    phone: string;
    sector: string;
    photo: string;
}

export class CreateUserDto implements IUser {
    readonly name: string;
    readonly lastname: string;
    readonly birthday: Date;
    readonly email: string;
    readonly phone: string;
    readonly sector: string;
    readonly photo: string;

    constructor(data: IUser) {
        Object.assign(this, data);
    }
}
