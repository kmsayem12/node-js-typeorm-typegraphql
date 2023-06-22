import { Request, Response, NextFunction } from "express";

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

interface AppErrorArgs {
  name?: string;
  httpCode: HttpCode;
  description: string;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;

    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}

// export class AppError extends Error {
//     status: string;
//     isOperational: boolean;
//     constructor(public statusCode: number = 500, public message: string) {
//       super(message);
//       this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//       this.isOperational = true;

//       Error.captureStackTrace(this, this.constructor);
//     }
//   }

// Error object used in error handling middleware function
// class AppError extends Error {
//   statusCode: number;

//   constructor(statusCode: number, message: string) {
//     super(message);

//     Object.setPrototypeOf(this, new.target.prototype);
//     this.name = Error.name;
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this);
//   }
// }

// Middleware function for logging the request method and request URL
/*eslint-disable*/
// @ts-ignore
export const requestLogger = (
  request: Request,
  // @ts-ignore
  response: Response,
  next: NextFunction
) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

// Error handling Middleware functions

// Error handling Middleware function for logging the error message
/*eslint-disable*/
export const errorLogger = (
  error: Error,
  // @ts-ignore
  request: Request,
  // @ts-ignore
  response: Response,
  next: NextFunction
) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};
// Error handling Middleware function reads the error message
// and sends back a response in JSON format
/*eslint-disable*/
export const errorResponder = (
  error: AppError,
  // @ts-ignore
  request: Request,
  response: Response,
  // @ts-ignore
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = error.httpCode || 400;
  response.status(status).send(error.message);
};
// Fallback Middleware function for returning
// 404 error for undefined paths
/*eslint-disable*/
export const invalidPathHandler = (
  // @ts-ignore
  request: Request,
  response: Response,
  // @ts-ignore
  next: NextFunction
) => {
  response.status(404);
  response.send("invalid path");
};
/*eslint-disable*/

/*eslint-disable*/
export const errorJsonResponse = (
  response: Response,
  httpCode: HttpCode,
  message: string,
  next: NextFunction
) => {
  response.status(httpCode).json({ message });
  return next();
};
