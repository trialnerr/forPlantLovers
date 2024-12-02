/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import logger from "morgan";
import passport from "passport";
import { PassportStatic } from "passport";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database";
//error handler middleware
import  globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundHandler from "./middleware/notFound";
//Routers
import userRouter from "./routes/userRouter";
import { env } from "process";
import passportConfig from "./config/passport";

const typedPassport = passport as PassportStatic;
const app = express();
const PORT = process.env.PORT || 3001;

await connectDB(); 
passportConfig(typedPassport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

//set up sessions 
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: env.DB_STRING })
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((passport).initialize());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((passport).session());




//serve static files from the dist folder during production
// app.use(express.static(path.join(__dirname, "../../../dist")));

// app.use("/api", mainRouter);
app.use("/api/user", userRouter);

// Catch-all route to serve the React app for any unmatched routes
// app.get("*", (_, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

app.use("api/*", notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
