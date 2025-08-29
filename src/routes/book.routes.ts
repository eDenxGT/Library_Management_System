import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  checkoutBook,
  createBook,
  getBooks,
} from "../controllers/book.controller";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, createBook)
  .get(authMiddleware, getBooks);

router.route("/:id/checkout").get(authMiddleware, checkoutBook);

export default router;
