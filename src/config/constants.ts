/**
 * Success messages for different actions.
 */
export const SUCCESS_MESSAGES = {
  // * User related success messages
  REGISTER: "User registered successfully",
  LOGIN: "User logged in successfully",

  // * Book related success messages
  CREATE_BOOK: "Book created successfully",
  GET_BOOKS: "Books fetched successfully",
  CHECKOUT_BOOK: "Book checked out successfully",
};

/**
 * Error messages for different actions.
 */
export const ERROR_MESSAGES = {

  // * User related error messages
  USER_ALREADY_EXISTS: "User already exists",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",

  // * Common error messages
  NOT_FOUND: "Not found",
  UNAUTHORIZED: "Unauthorized",
  INVALID_TOKEN: "Invalid token",

  // * Book related error messages
  INVALID_BOOK_ID: "Invalid book ID",
  INVALID_STOCK: "Invalid stock",
  BOOK_NOT_FOUND: "Book not found",
  BOOKS_OUT_OF_STOCK: "Books out of stock",
};

/**
 * HTTP status codes.
 */
export const HTTP_STATUS = {
  // * Success status codes
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  // * Error status codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  // * Server error codes
  INTERNAL_SERVER_ERROR: 500,
} as const;
