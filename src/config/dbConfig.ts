import "reflect-metadata";
import { DataSource } from "typeorm";
import { entity } from "../entity";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb+srv://typeorm:ruuE5ylp5dc3QY2A@cluster0.63fepcn.mongodb.net/?retryWrites=true&w=majority",
  useNewUrlParser: true,
  synchronize: true,
  logging: ["error", "query"],
  entities: entity,
  migrations: [],
  subscribers: [],
});
