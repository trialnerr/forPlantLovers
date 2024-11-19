const express = require('express'); 
require("dotenv").config();
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api", (req, res) => {
  res.json(['banana', 'apple']);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
