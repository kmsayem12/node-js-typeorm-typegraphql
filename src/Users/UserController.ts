import { Request, Response } from "express";
import { UserCreate, UserUpdate } from "./dto/UserDto";
import { User } from "./UserEntity";
import { UserService } from "./UserService";

export class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // @ts-ignore
  // request: Request, next: NextFunction
  async all(response: Response): Promise<User[]> {
    return await this.userService.getAll();
  }

  async one(request: Request): Promise<User | undefined> {
    const id = request.params.id;
    return await this.userService.getOne(id);
  }

  async save(request: Request): Promise<User> {
    const { firstName, lastName, age } = request.body as UserCreate;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userService.create(user);
  }

  async update(request: Request): Promise<User> {
    const id = request.params.id;
    const { firstName, lastName, age } = request.body as UserUpdate;
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      age,
    });

    return this.userService.update(id, user);
  }

  async remove(request: Request): Promise<string> {
    const id = request.params.id;
    await this.userService.delete(id);

    return "user has been removed";
  }
}
