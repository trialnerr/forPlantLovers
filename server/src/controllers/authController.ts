// import { NextFunction, Request, Response } from "express";
// import { HttpCode, UserRegistrationRequestBody } from "../types/types";
// import { User } from "../models/User";
// import { createServerError } from "../utils/createServerError";

// const createToken = async (
//   req: Request<object, object, UserRegistrationRequestBody>,
//   res: Response,
//   next: NextFunction,
// ) => {
//     const token = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your .env file
//       { expiresIn: "1h" },
//     );
// };

// const authController = {
//   createToken,
// };

// export default authController;
