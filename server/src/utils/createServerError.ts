import { HttpCode, ServerError } from "../types/types";

export const createServerError = (
  message: string,
  status: HttpCode = HttpCode.INTERNAL_SERVER_ERROR,
  log?: string
): ServerError => {
  const error = new Error(message) as ServerError;
  error.status = status;
  error.log = log;
  return error;
};
