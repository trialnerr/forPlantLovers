/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from "express";
import {
  HttpCode,
  UserLoginRequestBody,
  UserRegistrationRequestBody,
} from "../types/types";
import { User } from "../models/User";
import { createServerError } from "../utils/createServerError";
import passport from "passport";

const createUser = async (
  req: Request<object, object, UserRegistrationRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        createServerError(
          "Email address already in use",
          HttpCode.BAD_REQUEST,
          "user already exists",
        ),
      );
    }
    const user = await User.create({ email, password });
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  } catch (error) {
    return next(
      createServerError(
        "Something went wrong",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error creating new user, ${error}`,
      ),
    );
  }
};

const authenticateUser = (
  req: Request<object, object, UserLoginRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("local", (err, user: Express.User, _info) => {
    if (err) {
      return next(
        createServerError(
          "Something went wrong",
          HttpCode.INTERNAL_SERVER_ERROR,
          `Error logging in user, ${err}`,
        ),
      );
    }
    if (!user) {
      return next(
        createServerError(
          "Invalid email or password",
          HttpCode.UNAUTHORIZED,
          "Invalid email or password",
        ),
      );
    }
    req.login(user, (err) => {
      if (err) {
        return next(
          createServerError(
            "Something went wrong",
            HttpCode.INTERNAL_SERVER_ERROR,
            `Error logging in user, ${err}`,
          ),
        );
      }
      next();
    });
  })(req, res, next);
};

const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.cookies);
    req.logout((err) => {
      if (err) {
        return next(
          createServerError(
            "error logging out",
            HttpCode.INTERNAL_SERVER_ERROR,
            `Error logging out, ${err}`,
          ),
        );
      }
      req.session.destroy((err) => {
        if (err)
          console.log(
            "Error : Failed to destroy the session during logout.",
            err,
          );
        req.user = undefined;
      });
      console.log("logged out");

    });
    
    // res.clearCookie("connect.sid");
    console.log(req.isAuthenticated()); //logged false!
    console.log(req.cookies); //
    console.log(req.session); //undefined 
    console.log(req.user); //null
    next();
  } catch (error) {
    next(
      createServerError(
        "error logging out",
        HttpCode.INTERNAL_SERVER_ERROR,
        `Error logging out, ${error}`,
      ),
    );
  }
};
const userController = {
  createUser,
  authenticateUser,
  logoutUser,
};

export default userController;
