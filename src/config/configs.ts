/**
 * Configuration object for the application.
 */
export const config = {
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
  DATABASE: {
    URI:
      process.env.MONGO_URI ||
      "mongodb://localhost:27017/library-management-system",
  },

  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
