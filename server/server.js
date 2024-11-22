const express = require("express");
const path = require("path");
const apiReq = require("./apiTest");

// apiReq();  (dont use! Limited credits)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files from the dist folder during production
app.use(express.static(path.join(__dirname, "../dist")));

//testing frontend connection
app.get("/api", (req, res) => {
  res.json(["banana", "apple"]);
});

//route for identification
//BODY : [{images, organs}] up to length 4
//RESPONSE: like sample response
//TO DO: Figure out how to convert apiTest to this route
app.post("api/identify", (req, res) => {});

//route for storing images in db?
app.post("api/store", (req, res) => {});

// Catch-all route to serve the React app for any unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
