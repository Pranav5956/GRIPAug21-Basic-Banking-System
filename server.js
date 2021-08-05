import accountsRoute from "./routes/accounts.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import transactionsRoute from "./routes/transactions.js";

// Initializing the app
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Logging enabled in development
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(cors());
}

// Middleware
app.use(express.json());
app.use("/api/accounts", accountsRoute);
app.use("/api/transactions", transactionsRoute);
// app.use("*", (req, res) => res.status(404).send());

// Starting the server
app.listen(port, () => console.log("Server listening..."));

// MongoDB Configuration
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log(`Database connection error: ${err.message}`));
