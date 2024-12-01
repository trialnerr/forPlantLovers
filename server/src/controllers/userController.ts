/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from "express";
import { HttpCode, UserLoginRequestBody, UserRegistrationRequestBody } from "../types/types";
import { User } from "../models/User";
import { createServerError } from "../utils/createServerError";
import jwt from "jsonwebtoken";
// import { configDotenv } from "dotenv";
// configDotenv();
import { env } from 'node:process';

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

    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const token: string = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" },
    );

    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: true,
      maxAge: 7200000, //2hr (time in milliseconds)
    });

    res.locals.user = { user_id: user._id, user: user.userName };

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
   
    const user = await User.findOne({ email });
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const token: string = jwt.sign(
      { userId: user._id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: "2 days" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 7200000, //2hr (time in milliseconds)
    });

    res.locals.user = { user_id: user._id, user: user.userName };

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


const userController = {
  createUser,
  verifyUser
};

export default userController;
