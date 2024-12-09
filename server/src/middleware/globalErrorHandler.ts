import { NextFunction, Request, Response } from "express";
import { ServerError } from "../types/types";

const globalErrorHandler = (err: ServerError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: err.message });
  }
  console.log(err.log);
};

export default globalErrorHandler;
