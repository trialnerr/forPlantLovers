import { Document, Schema, model } from "mongoose";

export interface IRefreshToken extends Document {
  refreshToken: string;
  userId: Schema.Types.ObjectId;
  isValid: boolean;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  refreshToken: { type: String, required: true, unique: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isValid: { type: Boolean, default: true },
  createdAt: { type: Date, expires: "1 month", default: Date.now },
});

const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema,
);

export default RefreshToken;

