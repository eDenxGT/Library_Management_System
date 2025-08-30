import { ERROR_MESSAGES, HTTP_STATUS } from "../config/constants";
import Book, { IBook } from "../models/book.model";
import { AppError } from "../utils/app.error";
import { CreateBookDTO, GetBooksQueryDto } from "../validators/book.validator";

/**
 * Creates a new book in the database.
 *
 * @param data - Book data to create
 * @returns The created book
 */
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

/**
 * Fetches books from the database based on query filters.
 *
 * Filters supported:
 * - genre: filter by book genre
 * - author: filter by book author
 * - minYear: filter by published year greater than or equal to the given year
 * - available: only include books that are in stock
 *
 * Applies pagination using `offset` (skip) and `limit`.
 *
 * @param query - Query parameters for filtering and pagination
 * @returns An object containing:
 *  - books: array of filtered/paginated books
 *  - total: total count of matching books
 */
export const getBooksService = async (
  query: GetBooksQueryDto
): Promise<IBook[]> => {
  const filter: { [key: string]: any } = {};
  if (query.genre) filter.genre = query.genre;
  if (query.author) filter.author = query.author;
  if (query.minYear) filter.publishedYear = { $gte: query.minYear };
  if (query.available) filter.stock = { $gt: 0 };

  const books = await Book.find(filter).skip(query.offset).limit(query.limit);

  if (books.length === 0) {
    throw new AppError(
      ERROR_MESSAGES.BOOK_NOT_FOUND,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  return books;
};

/**
 * Checks out a book by decrementing its stock.
 *
 * @param bookId - ID of the book to checkout
 * @returns The updated book
 */
export const checkoutBookService = async (bookId: string): Promise<IBook> => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(ERROR_MESSAGES.BOOK_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  if (book.stock <= 0) {
    throw new AppError(
      ERROR_MESSAGES.BOOKS_OUT_OF_STOCK,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  book.stock -= 1;

  await book.save();

  return book;
};
