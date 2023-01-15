const app = require("./app");
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5001",
      "https://trackexpense.onrender.com",
      "https://editor.swagger.io",
    ],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Backend listening to port ${PORT}`);
});
