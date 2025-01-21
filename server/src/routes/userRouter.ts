import express, { Request, Response } from "express";
import userController from "../controllers/userController.js";
import validateUserRegistration from "../middleware/validateUser.js";
import { ensureAuth } from "../middleware/auth.js";
import { PassportRequest } from "../types/types.js";
const userRouter = express.Router();

userRouter.post(
  "/register",
  validateUserRegistration,
  userController.createUser,
  (req: Request, res: Response) => {
    const passportReq = req as PassportRequest;
    const { email, _id } = passportReq.user;
    res.status(200).json({ email, _id });
  },
);

userRouter.post(
  "/login",
  validateUserRegistration,
  userController.authenticateUser,
  (req: Request, res: Response) => {
    const passportReq = req as PassportRequest;
    const { email, _id } = passportReq.user;
    res.status(200).json({ email, _id });
  },
);

userRouter.post(
  "/logout",
  ensureAuth,
  userController.logoutUser,
  (_req: Request, res: Response) => {
    res.status(200).json("User successfully logged out!");
  },
);

userRouter.get("/check", ensureAuth, (req: Request, res: Response) => {
  const passportReq = req as PassportRequest;
  const { email, _id } = passportReq.user;
  res.status(200).json({ email, _id });
});

export default userRouter;
