import { MongoDBClient } from "./../utils/mongodb/clients";
import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { UserService } from "./repository/user-repo";

//Create and configure container

const userContainer = new Container();
userContainer.bind<UserService>(TYPES.UserService).to(UserService);
userContainer.bind<MongoDBClient>(TYPES.MongoDBClient).to(MongoDBClient);

export { userContainer };
