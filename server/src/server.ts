import express, { Request, Response } from "express";
import path from "path";
import mainRouter from "./routes/main";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the dist folder during production
app.use(express.static(path.join(__dirname, "../dist")));

app.use("/api", mainRouter);

//route for identification
//BODY : [{images, organs}] up to length 4
//RESPONSE: like sample response
//TO DO: Figure out how to convert apiTest to this route
//save the image to cloudinary first & then
app.post("api/identify", (req, res) => {});

//route for storing images in db?
app.post("api/store", (req, res) => {});

// Catch-all route to serve the React app for any unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
