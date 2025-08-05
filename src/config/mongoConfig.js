import mongoose from "mongoose";
import { config } from "./config.js";

const mongoDBConnection = () => {
  return mongoose.connect(config.mongoOptions.url);
};

export default mongoDBConnection;
