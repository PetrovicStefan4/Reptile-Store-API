const express = require("express");
const dotenv = require("dotenv").config();
const getReptiles = require("./routes/reptiles/getReptiles");
const path = require("path");

const port = process.env.PORT || 6000;
const app = express();

app.use("/api/reptiles", getReptiles);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    return res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
