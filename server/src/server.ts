import express from "express";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import connectDB from "./config/database";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundHandler from "./middleware/notFound";
import { env } from "process";
import passportConfig from "./config/passport";
import cors from "cors";
import userRouter from "./routes/userRouter";
import mainRouter from "./routes/mainRouter";
import plantRouter from "./routes/plantRouter";
import plantNoteRouter from "./routes/plantNoteRouter";

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB();
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

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});



