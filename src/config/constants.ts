/**
 * Success messages for different actions.
 */
export const SUCCESS_MESSAGES = {
  REGISTER: "User registered successfully",
  LOGIN: "User logged in successfully",
  CREATE_BOOK: "Book created successfully",
  GET_BOOKS: "Books fetched successfully",
  CHECKOUT_BOOK: "Book checked out successfully",
};

/**
 * Error messages for different actions.
 */
export const ERROR_MESSAGES = {
  NOT_FOUND: "Not found",
  USER_ALREADY_EXISTS: "User already exists",
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  UNAUTHORIZED: "Unauthorized",
  INVALID_TOKEN: "Invalid token",
  INVALID_BOOK_ID: "Invalid book ID",
  BOOK_NOT_FOUND: "Book not found",
  INVALID_STOCK: "Invalid stock",
};

/**
 * HTTP status codes.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500,
} as const;
