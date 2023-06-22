import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { AppDataSource } from "./config/dbConfig";

import { resolvers } from "./resolvers";
import { expressRoutes } from "./routes";
import {
  errorLogger,
  errorResponder,
  // invalidPathHandler,
  requestLogger,
} from "./utils/appError";
// import { errorHandeler } from "./middleware/errorHandeler";

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(async () => {
    const schema = await buildSchema({
      resolvers,
      container: Container,
      emitSchemaFile: true, // add this
      validate: false,
    });

    const server = new ApolloServer({ schema });

    // create express app
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
    expressRoutes(app, PORT);

    // app.use(errorHandeler);

    app.use(requestLogger);

    // Attach the first Error handling Middleware
    // function defined above (which logs the error)
    app.use(errorLogger);

    // Attach the second Error handling Middleware
    // function defined above (which sends back the response)
    app.use(errorResponder);

    // Attach the fallback Middleware
    // function which sends back the response for invalid paths)
    // app.use(invalidPathHandler);
  })
  .catch((error) => console.log(error));
