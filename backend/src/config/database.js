import mongoose from "mongoose";

const db = process.env.MONGODB;

export const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log("connected to the db");
  } catch (error) {
    console.log(error.message);
  }
};
