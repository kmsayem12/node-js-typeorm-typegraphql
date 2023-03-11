import { Request, Response } from "express";
// import { AppDataSource } from "../config/dbConfig";
import { userRoutes } from "../Users";
// import { UserEntity } from "../Users";

export const Routes = [...userRoutes];

// register express routes from defined application routes
export const expressRoutes = async (app: any, port: string | number) => {
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });

  // insert new users for test
  // await AppDataSource.manager.save(
  //   AppDataSource.manager.create(UserEntity, {
  //     firstName: "Timber",
  //     lastName: "Saw",
  //     age: 27,
  //   })
  // );

  console.log(
    `Express server has started on port ${port}. Open http://localhost:${port}/users to see results`
  );
};
