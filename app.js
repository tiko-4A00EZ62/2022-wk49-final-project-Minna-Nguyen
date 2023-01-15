const express = require("express");
const cors = require("cors");
const routes = require("./routes/expenses");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    origin: [
      "https://editor.swagger.io",
      "http://localhost:5001",
      "https://trackexpense.onrender.com",
    ],
  })
);
// ths is the basic mount path
app.use("/api/expenses", routes);
app.get("/health", (req, res) => {
  res.send("200 OK");
});

module.exports = app;
