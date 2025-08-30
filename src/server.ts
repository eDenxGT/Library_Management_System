import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { config } from "./config/configs";
import morgan from "morgan";
import authRouter from "./routes/auth.routes";
import bookRouter from "./routes/book.routes";
import expressRateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

//  database connection
connectDB(config.DATABASE.URI);

//  middleware
app.use(express.json());
app.use(morgan("dev"));

/**
 * Rate limiting (to prevent abuse)
 * (below configuration limits are set to 100 requests per 15 minutes)
 */
app.use(
  expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

/**
 * CORS Policy setting
 * (to allow requests from different origins)
 */
app.use(cors({ origin: "*" }));

//  security for headers (protects against some well-known attacks)
app.use(helmet());

//  routes
app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);

/**
 * Error handling middleware.
 * (to handle unknown routes)
 */
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

//  server startup
app.listen(config.SERVER.PORT, () => {
  console.log(`Server is running on port ${config.SERVER.PORT}`);
});
