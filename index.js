const express = require("express");
const routes = require("./routes/expenses");

const app = express();
app.use(express.json());

// ths is the basic mount path
app.use("/api/expenses", routes);

app.get("/api/expenses/check/health", (req, res) => {
  res.send("200 OK");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend listening to port ${PORT}`);
});
