import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
export const errorHandeler = (
  err: Error,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.formatErrors() });
  }
  return res
    .status(400)
    .send({ errors: [{ message: "Something went wrong" }] });
};
