import { User } from "./../models/user";
import { TYPES } from "./../types";
import { MongoDBClient } from "./../../utils/mongodb/clients";
import { inject, injectable } from "inversify";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.MongoDBClient) private mongoClient: MongoDBClient
  ) {}

  public getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.mongoClient.find("user", {}, (error, data: User[]) => {
        resolve(data);
      });
    });
  }

  public getUserById(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.findOneById("user", id, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public createUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.insert("user", user, (error, data: User) => {
        resolve(data);
      });
    });
  }

  public deleteUser(id: string): Promise<any> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.remove("user", id, (error, data: any) => {
        resolve(data);
      });
    });
  }

  public updateUser(id: string, user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.mongoClient.update("user", id, user, (error, data: User) => {
        resolve(data);
      });
    });
  }
}
