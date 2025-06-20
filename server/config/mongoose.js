import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// const baseUrl = process.env.DB_URL || "0.0.0.0:27017";
const baseUrl = process.env.DB_URL;
// console.log(baseUrl);
export const connectUsingMongoose = async () => {
  try {
    await mongoose
      .connect(baseUrl, {
        dbName: "Ecomerce"
      })
      .then(() => console.log("Mongodb connected using mongoose"))
      .catch((err) =>
        console.error("Error while connecting to db:", err.message)
      );
  } catch (error) {
    console.log(`Error while connecting to db ${error.message}`);
  }
};
