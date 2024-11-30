import { Schema, model, connect } from 'mongoose';
import bcrypt from 'bcrypt'


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  password: string; 
  avatar?: string; 
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
});

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
const User = model<IUser>("User", userSchema);

