import { User } from "./UserEntity";

// Provide resolver functions for your schema fields
export const userResolvers = {
  Query: {
    getUser: async (_: any, args: any) => {
      const { id } = args;
      return await User.findOneById(id);
    },
    getUsers: async (_: any) => {
      return await User.find();
    },
  },
  Mutation: {
    addUser: async (_: any, args: any) => {
      const { firstName, lastName, age } = args;
      try {
        await User.create({
          firstName,
          lastName,
          age,
        });

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
