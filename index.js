const express = require("express");
const userRouter = require("./src/routes/userRoute");
const transactionRouter = require("./src/routes/transactionRoute");
const incomeRouter = require("./src/routes/incomeRoute");
const investmentRouter = require("./src/routes/investmentRoute");
const expenseRouter = require("./src/routes/expenseRouter");
const protect = require("./src/middleware/authMiddleware");

const app = express();
const res = require("dotenv").config();

// console.log(res);

app.use(express.static("public"));

app.use(express.json());
app.use("/auth", userRouter);
app.use("/", protect); // Apply protect middleware here
app.use("/", transactionRouter); // Apply transactionRouter after protect middleware
app.use("/", incomeRouter);
app.use("/", investmentRouter);
app.use("/", expenseRouter);

app.get("/get", protect, async (req, res) => {
  res.send("protected url working");
});

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
