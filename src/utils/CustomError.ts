import { ValidationError } from "express-validator";

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract formatErrors(): { message: string; field?: string }[];
}

export class ReqVaidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ReqVaidationError.prototype);
  }
  formatErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
