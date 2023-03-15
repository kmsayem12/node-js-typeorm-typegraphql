import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import { UserCreate, UserUpdate } from "./dto/UserDto";
import { User } from "./UserEntity";
import { UserService } from "./UserService";

@Service()
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id") id: string): Promise<User | undefined> {
    return await this.userService.getOne(id);
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserCreate): Promise<User> {
    return await this.userService.create(data);
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("updateData") updateData: UserUpdate
  ): Promise<User> {
    return await this.userService.update(id, updateData);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    return await this.userService.delete(id);
  }
}
