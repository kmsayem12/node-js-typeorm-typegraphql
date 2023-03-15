import { Service } from "typedi";
import { UserCreate, UserUpdate } from "./dto/UserDto";
import { User } from "./UserEntity";

const ObjectID = require("mongodb").ObjectID;

@Service()
export class UserService {
  getAll = async (): Promise<User[]> => {
    return await User.find();
  };

  getOne = async (id: string): Promise<User | undefined> => {
    const user = await User.findOne({
      where: { _id: new ObjectID(id) },
    });

    if (!user) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }
    return user;
  };

  create = async (createUserInput: UserCreate): Promise<User> => {
    return await User.create(createUserInput).save();
  };

  update = async (id: string, updateUserInput: UserUpdate): Promise<User> => {
    const UserFound = await User.findOne({
      where: { _id: new ObjectID(id) },
    });

    if (!UserFound) {
      throw new Error(`The User with id: ${id} does not exist!`);
    }

    Object.assign(UserFound, updateUserInput);
    const updatedUser = await UserFound.save();

    return updatedUser;
  };

  delete = async (id: string): Promise<boolean> => {
    const UserFound = await User.findOne({
      where: { _id: new ObjectID(id) },
    });

    if (!UserFound) {
      throw new Error(`The User with id: ${id} does not exist!`);
    }

    await UserFound.remove();

    return true;
  };
}
