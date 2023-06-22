import { Service } from "typedi";
import { User } from "../Users/UserEntity";

@Service()
export class AuthService {
  getUserByEmail = async (email: string): Promise<User | undefined> => {
    const user = await User.findOne({ where: { email } });
    return user || undefined;
  };

  checkValidPassword = async (user: User, password: string) => {
    return user?.checkIfUnencryptedPasswordIsValid(password);
  };
}
