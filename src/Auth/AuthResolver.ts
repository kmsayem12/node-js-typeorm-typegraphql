import { Resolver, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import { UserLogin } from "../Users/dto/UserDto";
import { User } from "../Users/UserEntity";
// import { AuthService } from "./AuthService";
//
@Service()
@Resolver()
export class AuthResolver {
  // constructor(private readonly AuthService: AuthService) {}

  @Mutation(() => User)
  async createAuth(@Arg("data") data: UserLogin) {
    console.log(data);
  }
}
