import { Types, Schema, model , Document} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  gallery?: [
    {
      plantID: Types.ObjectId;
      idDate: Date;
      idPlace: string;
      uploadedImages: string[];
      notes: string;
    },
  ];
  avatar?: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  // gallery: [
  //   {
  //     plantID: {
  //       type: Schema.Types.ObjectId,
  //       ref: "Plant",
  //     },
  //     idDate: Date,
  //     idPlace: String,
  //     uploadedImages: [String],
  //     notes: String,
  //   },
  // ],

  createdAt: { type: Date, default: Date.now },
});

//encrypt the password before saving
UserSchema.pre<IUser>("save", async function (next) {
  try {
    //if the password is not modified, then we don't need to encrypt it again
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Error occured hashing password."));
    }
  }
});

//validate password (this refers to the model)
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const user = this as IUser;
  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch; 
  } catch (error) {
    console.error('Error comparing passwords', error); 
    throw new Error("Error comparing passwords.");
  }
};

export const User = model<IUser>("User", UserSchema);

//https://www.slingacademy.com/article/mongoose-define-schema-typescript/
