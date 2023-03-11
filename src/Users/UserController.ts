import { AppDataSource } from "../config/dbConfig";
import { NextFunction, Request, Response } from "express";
import { User } from "./UserEntity";
import { UserService } from "./UserService";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  private userRepository = AppDataSource.getRepository(User);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;
    return await this.userService.getOne(id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, age } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id;

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
