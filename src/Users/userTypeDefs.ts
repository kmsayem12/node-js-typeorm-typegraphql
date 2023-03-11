// Construct a schema, using GraphQL schema language
import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type Query {
    getUser(id: String!): User
    getUsers: [User!]!
  }
  type Mutation {
    addUser(firstName: String!, lastName: String, age: Int!): Boolean!
  }
  type User {
    id: String!
    firstName: String!
    lastName: String!
    age: Int!
  }
`;
