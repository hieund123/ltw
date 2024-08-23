import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./src/router/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;

app.use(express.json());
app.use(cors()); 

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(URI_DB)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });