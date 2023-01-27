const express = require("express");
const dotenv = require("dotenv").config();
const getReptiles = require("./routes/reptiles/getReptiles");
const path = require("path");

const port = process.env.PORT || 5000;
const app = express();
console.log(path.join(__dirname, "public"));

app.use("/assets", express.static(path.join(__dirname, "/public")));
app.use("/api/reptiles", getReptiles);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
