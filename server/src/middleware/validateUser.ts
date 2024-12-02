/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { HttpCode, UserRegistrationRequestBody } from "../types/types";
import { createServerError } from "../utils/createServerError";

const validateUserRegistration = (
  req: Request<object, object, UserRegistrationRequestBody>,
  _res: Response,
  next: NextFunction,
): void => {
  const validationErrors: { msg: string }[] = [];
  const { email, password }: UserRegistrationRequestBody = req.body;
  
  if (!validator.isEmail(email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }


  if (!validator.isLength(password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long.",
    });
  }

  const normalizedEmail: string | boolean = validator.normalizeEmail(email, {
    gmail_remove_dots: false,
  });

  if (!normalizedEmail) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  } else {
    req.body.email = normalizedEmail;
  }

  if (validationErrors.length) {
    const message: string = JSON.stringify(validationErrors);
    const error = createServerError(
      message,
      HttpCode.BAD_REQUEST,
      "user info failed validation",
    );
    return next(error);
  }

  return next();
};

export default validateUserRegistration;
