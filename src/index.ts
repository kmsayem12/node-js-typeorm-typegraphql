import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { AppDataSource } from "./config/dbConfig";

import { typeDefs } from "./types";
import { resolvers } from "./resolvers";
import { expressRoutes } from "./routes";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    // create express app
    const app = express();
    app.use(bodyParser.json());

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
    expressRoutes(app, PORT);
  })
  .catch((error) => console.log(error));
