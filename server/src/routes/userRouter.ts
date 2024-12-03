import express, { Request, Response } from "express";
import userController from "../controllers/userController";
import validateUserRegistration from "../middleware/validateUser";
import { ensureAuth } from "../middleware/auth";
import { PassportRequest } from "../types/types";
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
// userRouter.get(
//   "/protected",
//   (req: Request, res: Response) => {
//     if (!req.isAuthenticated()) {
//       res.status(401).send("Unauthorized");
//     }
//     else {
//       res.json(req.user);
//     }
//   },
// );

// userRouter.get("/protected", (req: Request, res: Response) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).send("Unauthorized");
//   }
//   res.send("Welcome to the protected route!");
// });

export default userRouter;
