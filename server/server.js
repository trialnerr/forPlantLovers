const express = require("express");
const path = require("path");
const axios = require("axios");
const apiReq = require('./apiTest'); 

// apiReq();  (dont use! Limited credits)

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.json(["banana", "apple"]);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

