import express from "express";
import cors from "cors";
import mongoDBConnection from "./src/config/mongoConfig.js";
import { config } from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";

const app = express();

// GET PORT
const PORT = config.port;

//cors
app.use(cors());

// request body
app.use(express.json());

app.use("/api/v1/auth", authRouter);

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
        console.log("SERVER COULD NOT BE STARTED");
      } else {
        console.log("SERVER STARTED AT PORT:", PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });
