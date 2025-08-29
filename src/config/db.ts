import mongoose from "mongoose";

//  database connection
export const connectDB = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
