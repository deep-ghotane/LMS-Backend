import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDBConnection from "./src/config/mongoConfig.js";
import { config } from "./src/config/config.js";

dotenv.config();
const app = express();

// GET PORT
const PORT = config.port || 8000;

//cors
app.use(cors());

// request body
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "I AM ALIVE",
  });
});

//mongo connection

mongoDBConnection()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server could not be started");
      } else {
        console.log("server started at port:", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MOngo db connection error");
  });
