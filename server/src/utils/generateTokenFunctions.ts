/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import jwt from "jsonwebtoken";
import { env } from "process";

export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
