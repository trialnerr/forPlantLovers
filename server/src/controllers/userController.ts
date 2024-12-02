/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from "express";
import { HttpCode, UserLoginRequestBody, UserRegistrationRequestBody } from "../types/types";
import { IUser, User } from "../models/User";
import { createServerError } from "../utils/createServerError";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokenFunctions";

const createUser = async (
  req: Request<object, object, UserRegistrationRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, userName } = req.body;

    const existingUser = await User.findOne({ email });
    //should I redirect to signup here?
    if (existingUser) {
      return next(
        createServerError(
          "Email address already in use",
          HttpCode.BAD_REQUEST,
          "user already exists",
        ),
      );
    }
    const user = new User({ email, password, userName });
    await user.save();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const userId: string = user.id.toString() as string;
    const accessToken = generateAccessToken(userId, email);
    const refreshToken = generateRefreshToken(userId, email);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });

    res.locals.user = {
      userId,
      user: user.userName,
      accessToken,
    };

    next();

    next();
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

const verifyUser = async (
  req: Request<object, object, UserLoginRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) as IUser;
    if (!user) {
      return next(
        createServerError(
          "Invalid credentials",
          HttpCode.BAD_REQUEST,
          "Email doesnt exist in db!",
        ),
      );
    }
    const isMatch: boolean = await user.comparePassword(password);
    if (!isMatch) {
      return next(
        createServerError(
          "Invalid credentials",
          HttpCode.BAD_REQUEST,
          "Incorrect password",
        ),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const userId: string = user.id.toString() as string; 
    const accessToken = generateAccessToken(userId, email);
    const refreshToken = generateRefreshToken(userId, email);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    res.locals.user = {
      userId,
      user: user.userName,
      accessToken,
    };

    next();
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

// const logoutUser = async (req: Request, res: Response, next: NextFunction){

// }
const userController = {
  createUser,
  verifyUser
};

export default userController;
