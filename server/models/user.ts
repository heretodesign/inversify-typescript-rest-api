import { IUser } from "./../repository/user-repo.interface";
export class User implements IUser {
  constructor(public name: string, public email: string, public id: string) {}
}
