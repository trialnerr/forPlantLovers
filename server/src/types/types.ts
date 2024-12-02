import { Request } from "express-serve-static-core";

export enum HttpCode {
  OK = 200,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ServerError extends Error {
  status: HttpCode;
  log?: string;
}

export interface UserRegistrationRequestBody {
  userName: string;
  email: string;
  password: string;
}

export interface UserLoginRequestBody {
  email: string;
  password: string;
}

export interface UserRequest extends Request {
  cookies: { refreshToken: string };
}
