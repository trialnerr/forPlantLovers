import jwt from "jsonwebtoken";
import { env } from "process";
import RefreshToken from "../models/RefreshTokens";
import { Types } from "mongoose";

export const generateAccessToken = (
  userId: Types.ObjectId,
  email: string,
): string => {
  return jwt.sign({ userId, email }, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = async (
  userId: Types.ObjectId,
  email: string,
): Promise<string> => {
  const refreshToken = jwt.sign({ userId, email }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  await saveRefreshTokenToDB(refreshToken, userId);
  console.log(refreshToken, "in generate");
  return refreshToken;
};

const saveRefreshTokenToDB = async (
  refreshToken: string,
  userId: Types.ObjectId,
): Promise<void> => {
  try {
    await RefreshToken.create({ refreshToken, userId });
  } catch (error) {
    throw new Error(`Error storing refresh token, ${error}`);
  }
};
