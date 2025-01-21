import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError.js";
import { HttpCode, ServerError } from "../types/types.js";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  const error: ServerError = createServerError("page not found", HttpCode.NOT_FOUND);
  next(error);
};

export default notFoundHandler;
