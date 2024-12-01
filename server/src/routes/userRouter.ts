import express from "express";
import userController from "../controllers/userController";
import validateUserRegistration from "../middleware/validateUser";

const userRouter = express.Router();

// userRouter.post("/login", userController.verifyUser, (req, res) => {
//   // post request for logging in
// });

// userRouter.get("/register", (req, res) => {
//   // load structure of register page
// });

userRouter.post("/register", validateUserRegistration, userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

export default userRouter;
