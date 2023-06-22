import { NextFunction, Request, Response } from "express";
// import { User } from "../Users/UserEntity";
import * as jwt from "jsonwebtoken";
// import { body, validationResult } from "express-validator";
// import { Auth } from "./AuthEntity";
import { AuthService } from "./AuthService";
import config from "../config/config";
import { UserLogin } from "../Users/dto/UserDto";
import { HttpCode } from "../utils/appError";
// import { ReqVaidationError } from "../utils/CustomError";

export class AuthController {
  AuthService: AuthService;

  constructor() {
    this.AuthService = new AuthService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    //Check if username and password are set
    let { email, password } = req.body as UserLogin;
    if (!(email && password)) {
      res.status(404).json({
        status: 400,
        message: "email and password required",
      });
      return next();
    }

    let user = await this.AuthService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({
        status: 401,
        message: "user not found",
      });
      return next();
    }

    //Check if encrypted password match
    if (!(await this.AuthService.checkValidPassword(user, password))) {
      res.status(HttpCode.BAD_REQUEST).json({
        status: HttpCode.BAD_REQUEST,
        message: "user not found",
      });
      return next();
      // res.status(HttpCode.BAD_REQUEST).json(
      //   new AppError({
      //     httpCode: HttpCode.BAD_REQUEST,
      //     description: "Invalid email or password",
      //   })
      // );
      // return next();
      // return next(
      //   new AppError({
      //     httpCode: HttpCode.BAD_REQUEST,
      //     description: "Invalid email or password",
      //   })
      // );
      // return errorJsonResponse(
      //   res,
      //   HttpCode.BAD_REQUEST,
      //   "Invalid email or password",
      //   next
      // );
      // return next();
      // body("email").isEmail().withMessage("Please provide valid email");

      // body("password")
      //   .isLength({ min: 4, max: 20 })
      //   .withMessage("Password must be between 4 and 20 characters");
      // const validationErrors = validationResult(req);
      // if (!validationErrors.isEmpty()) {
      //   throw new ReqVaidationError(validationErrors.array());
      // }
      // return next();
    }
    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user._id, username: user.email },
      config.jwtSecret,
      { expiresIn: config.expiresIn }
    );
    //Send the jwt in the response
    res.json({
      status: 200,
      token,
    });
    return next();
  }
}
