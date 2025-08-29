import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { config } from "./config/configs";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import bookRouter from "./routes/book.routes";
import expressRateLimit from "express-rate-limit";

dotenv.config();

const app = express();

connectDB(config.DATABASE.URI);

app.use(express.json());
app.use(morgan("dev"));

app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(config.SERVER.PORT, () => {
  console.log(`Server is running on port ${config.SERVER.PORT}`);
});
