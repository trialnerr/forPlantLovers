import express from "express";
import { connectDB } from "./config/database";
//error handler middleware
import  globalErrorHandler from "./middleware/globalErrorHandler";
import notFoundHandler from "./middleware/notFound";
//Routers
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3001;

await connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
