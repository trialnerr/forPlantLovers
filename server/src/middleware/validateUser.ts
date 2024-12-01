/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { HttpCode, UserRegistrationRequestBody } from "../types/types";
import { createServerError } from "../utils/createServerError";

const validateUserRegistration = (
  req: Request<object, object, UserRegistrationRequestBody >,
  res: Response,
  next: NextFunction,
): void => {
  const validationErrors: { msg: string }[] = [];
  console.log(req.body, 'in validate');
  const { email, password }: UserRegistrationRequestBody =
    req.body;
  console.log(email, password);

  if (!validator.isEmail(email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }

  if (!validator.isLength(password, { min: 8 })) {
    validationErrors.push({
      msg: "Password must be at least 8 characters long.",
    });
  }

  if (validationErrors.length) {
    const message: string = JSON.stringify(validationErrors);
    const error = createServerError(message, HttpCode.BAD_REQUEST, 'user info failed validation'); 
    return next(error); 
  }

  req.body.email = validator.normalizeEmail(email, {
    gmail_remove_dots: false,
  });
  console.log(req.body, 'after manipulation');
  return next();
};

export default validateUserRegistration;
