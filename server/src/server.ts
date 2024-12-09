import express from "express";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter";
import connectDB from "./config/database";
//error handler middleware
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundHandler from "./middleware/notFound";
//Routers

import { env } from "process";
import passportConfig from "./config/passport";
import cors from "cors";
import mainRouter from "./routes/mainRouter";
import plantRouter from "./routes/plantRouter";
import plantNoteRouter from "./routes/plantNoteRouter";
// import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB();
passportConfig(passport);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

//set up sessions
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: env.DB_STRING }),
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24,
    //   secure: false,  //come back to this
    //   sameSite: "none",
    // }
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/plantNote", plantNoteRouter);
app.use("/api/plant", plantRouter);
app.use("/api/user", userRouter);
app.use("/api", mainRouter);

// serve static files from the dist folder during production
// app.use(express.static(path.join(__dirname, "../../../dist")));

app.use("api/*", notFoundHandler);
// Catch-all route to serve the React app for any unmatched routes
// app.get("*", (_, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
