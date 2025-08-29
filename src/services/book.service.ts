import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants";
import Book, { IBook } from "../models/book.model";
import { AppError } from "../utils/app.error";
import { CreateBookDTO, GetBooksQueryDto } from "../validators/book.validator";

//  create book service
export const createBookService = async (data: CreateBookDTO) => {
  const book = await Book.create({
    title: data.title,
    author: data.author,
    publishedYear: data.publishedYear,
    genre: data.genre,
    stock: data.stock,
  });
  return book;
};

//  get books service
export const getBooksService = async (
  query: GetBooksQueryDto
): Promise<{ books: IBook[]; total: number }> => {
  const filter: { [key: string]: any } = {};
  if (query.genre) filter.genre = query.genre;
  if (query.author) filter.author = query.author;
  if (query.minYear) filter.publishedYear = { $gte: query.minYear };
  if (query.available) filter.stock = { $gt: 0 };

  const books = await Book.find(filter).skip(query.offset).limit(query.limit);

  const total = await Book.countDocuments(filter);

  return { books, total };
};

//  checkout book service
export const checkoutBookService = async (bookId: string): Promise<IBook> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(ERROR_MESSAGES.BOOK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  if (book.stock <= 0) {
    throw new AppError(ERROR_MESSAGES.INVALID_STOCK, HTTP_STATUS.NOT_FOUND);
  }

  book.stock -= 1;

  await book.save();

  return book;
};
