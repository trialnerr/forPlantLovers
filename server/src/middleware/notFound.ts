import { NextFunction, Request, Response } from "express";
import { createServerError } from "../utils/createServerError";
import { HttpCode, ServerError } from "../types/types";

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  const error: ServerError = createServerError("page not found", HttpCode.NOT_FOUND);
  next(error);
};

export default notFoundHandler;
