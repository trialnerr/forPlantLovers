import { Document, Schema, model } from "mongoose";

export interface IRefreshToken extends Document {
  refreshToken: string;
  userId: Schema.Types.ObjectId;
  isBlacklisted: boolean;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  refreshToken: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isBlacklisted: { type: Boolean, default: false },
  createdAt: { type: Date, expires: "1 month", default: Date.now },
});

const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema,
);

export default RefreshToken;

