const express = require("express");
const userRouter = require("./src/routes/userRoute");
const transactionRouter = require("./src/routes/transactionRoute");
const protect = require("./src/middleware/authMiddleware");
const cors = require("cors");

const app = express();
const res = require("dotenv").config();
app.use(cors());

// app.use(express.static("public"));
app.get("/", async (req, res) => {
  res.send("Expensia Backend API is working");
});
app.use(express.json());
app.use("/auth", userRouter);
app.use("/", protect); // Apply protect middleware here
app.use("/transactions", transactionRouter); // Apply transactionRouter after protect middleware

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;
