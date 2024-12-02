import express, { Request, Response } from "express";
import userController from "../controllers/userController";
import validateUserRegistration from "../middleware/validateUser";

const userRouter = express.Router();

userRouter.post(
  "/logout",
  userController.logoutUser,
  (_req: Request, res: Response) => {
    res.status(200).json({ message: "Logged out successfully" });
  },
);

userRouter.post(
  "/register",
  validateUserRegistration,
  userController.createUser,
  (_req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  },
);

userRouter.post(
  "/login",
  validateUserRegistration,
  userController.verifyUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  },
);

//route for refreshing tokens
//route for logout

export default userRouter;
