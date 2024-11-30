import express, {  } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the dist folder during production
// app.use(express.static(path.join(__dirname, "../../../dist")));

// app.use("/api", mainRouter);


// Catch-all route to serve the React app for any unmatched routes
// app.get("*", (_, res) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

// const globalErrorHandler: ErrorRequestHandler= (error: ServerError, _req: Request, res: Response, _next: NextFunction) => {
//   const defaultErr: ServerError = {
//     log: "Express error handler caught unknown middleware error",
//     status: HttpCode.INTERNAL_SERVER_ERROR,
//     message: "An error occured",
//   };
//   const errorObj = Object.assign({}, defaultErr, error);
//   console.log(errorObj.log);
//   res.status(errorObj.status).json(errorObj.message);
// }

// //global error handler
// app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
