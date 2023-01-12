const express = require("express");
const cors = require("cors");
const routes = require("./routes/expenses");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5001/api/expenses",
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
