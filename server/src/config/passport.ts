/* eslint-disable @typescript-eslint/no-misused-promises */
import { Strategy as LocalStrategy } from "passport-local";
import {IUser, User} from "../models/User";
import { PassportStatic } from "passport";
import { HydratedDocument } from "mongoose";

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email: string, password: string , done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          return done(null, false, { message: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            message: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid email or password." });
        }
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, (user as HydratedDocument<IUser>).id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};


