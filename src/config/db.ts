import mongoose from "mongoose";

/**
 * Connects to the database.
 * @param dbUri - The database URI.
 */
export const connectDB = async (dbUri: string) => {
  try {
    await mongoose.connect(dbUri);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
