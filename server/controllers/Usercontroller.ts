import { User } from "./../models/user";
import { UserService } from "./../repository/user-repo";
import { inject } from "inversify";
import {
  httpGet,
  controller,
  httpPost,
  httpPut,
  httpDelete,
  requestParam,
  response,
  request,
} from "inversify-express-utils";
import { TYPES } from "../types";
import * as express from "express";

@controller("/users")
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  //Get all Users
  @httpGet("/")
  private getUsers(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<User[]> {
    let users = this.userService.getUsers();
    if (!users) {
      res.status(404).json({ error: "users not found" });
    }
    return users;
  }

  // Get User by Id
  @httpGet("/:id")
  private getUserById(
    @requestParam("id") id: string,
    @response() res: express.Response
  ): Promise<User> {
    let user = this.userService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }
    return user;
  }

  // Create a new User
  @httpPost("/create")
  private async createUser(
    @request() req: express.Request,
    @response() res: express.Response
  ): Promise<User> {
    let newUser = await this.userService.createUser(req.body);
    return newUser;
  }

  // //Update an existing User
  @httpPut("/:id")
  private updateUserById(
    @requestParam("id") id: string,
    request: express.Request
  ): Promise<User> {
    return this.userService.updateUser(request.params.id, request.body);
  }

  // Delete a User
  @httpDelete("/:id")
  private deleteUserById(
    @requestParam("id") id: string,
    @response() res: express.Response
  ): Promise<User[]> {
    return this.userService.deleteUser(id);
  }
}
