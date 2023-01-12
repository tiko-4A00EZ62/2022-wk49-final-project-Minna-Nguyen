const express = require("express");
const routes = require("./routes/expenses");

const app = express();
app.use(express.json());

// ths is the basic mount path
app.use("/api/expenses/", routes);

app.get("/health", (req, res) => {
  res.send("200 OK");
});

module.exports = app;
