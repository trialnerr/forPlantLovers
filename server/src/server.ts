import express from "express";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import notFoundHandler from "./middleware/notFound.js";
import { env } from "process";
import passportConfig from "./config/passport.js";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import mainRouter from "./routes/mainRouter.js";
import plantRouter from "./routes/plantRouter.js";
import plantNoteRouter from "./routes/plantNoteRouter.js";

const app = express();
const PORT = process.env.PORT || 3001;

passportConfig(passport);

app.use(
  cors({ origin: "https://forplantlovers.onrender.com", credentials: true }),
);
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
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/plantNote", plantNoteRouter);
app.use("/api/plant", plantRouter);
app.use("/api/user", userRouter);
app.use("/api", mainRouter);
app.use("api/*", notFoundHandler);
app.use(globalErrorHandler);

connectDB().then(() => {
   app.listen(PORT, () => {
     console.log(`[server]: Server is running at http://localhost:${PORT}`);
   });
}).catch(console.dir);




