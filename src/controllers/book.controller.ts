import { Request, Response } from "express";
import {
  createBookSchema,
  getBooksQuerySchema,
} from "../validators/book.validator";
import {
  checkoutBookService,
  createBookService,
  getBooksService,
} from "../services/book.service";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../utils/helpers/response.handler";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../config/constants";
import { AppError } from "../utils/app.error";

export const createBook = async (req: Request, res: Response) => {
  try {
    const data = createBookSchema.parse(req.body);

    const book = await createBookService(data);

    handleSuccessResponse(
      res,
      SUCCESS_MESSAGES.CREATE_BOOK,
      HTTP_STATUS.CREATED,
      {
        book,
      }
    );
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const query = getBooksQuerySchema.parse(req.query);

    const data = await getBooksService(query);

    handleSuccessResponse(res, SUCCESS_MESSAGES.GET_BOOKS, HTTP_STATUS.OK, {
      data,
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const checkoutBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    if (!bookId) {
      throw new AppError(
        ERROR_MESSAGES.INVALID_BOOK_ID,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const book = await checkoutBookService(bookId);

    handleSuccessResponse(res, SUCCESS_MESSAGES.CHECKOUT_BOOK, HTTP_STATUS.OK, {
      book,
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
