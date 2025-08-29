# 📚 Library Management System API

A robust, production-ready RESTful API for managing library operations. Built with Node.js, Express, TypeScript, and MongoDB, this API provides secure user authentication and comprehensive book management features.

## ✨ Features

- 🔐 **Secure Authentication**
  - JWT-based authentication
  - Secure password hashing with bcrypt

- 📖 **Book Management**
  - Add new books with detailed information
  - Search and filter books by various criteria
  - Checkout system with stock management

- 🛠 **Technical Highlights**
  - TypeScript for type safety
  - MVC architecture with separation of concerns
  - Request validation using Zod
  - Comprehensive error handling
  - API rate limiting
  - Environment-based configuration

## Table of Contents
- [Requirements](#requirements)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Base URL](#base-url)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
    - [Authentication Endpoints](#authentication-endpoints)
      - [Register User](#register-user)
      - [User Login](#user-login)
    - [Books](#books)
      - [Create Book](#create-book)
      - [Get All Books](#get-all-books)
      - [Checkout Book](#checkout-book)
- [Response Format](#response-format)
- [Testing](#testing)
- [Submission](#submission)

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- npm or yarn
- MongoDB instance (local or remote)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd library-management-system-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your_jwt_secret_here
```

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected routes require JWT authentication. Include the token in the request header:
```
Token: <your_jwt_token>
```

## Endpoints

### Authentication Endpoints

#### Register User
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "username": "string (required, min: 3, max: 30)",
    "email": "string (required, valid email)",
    "password": "string (required, min: 6)"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "...",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
  ```

#### User Login
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "<jwt_token>",
    "user": {
      "_id": "...",
      "username": "testuser",
      "email": "test@example.com"
    }
  }
  ```

### Book Endpoints

#### Create Book
- **Method**: `POST`
- **Endpoint**: `/api/books`
- **Authentication**: Required (JWT)
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "author": "string (required)",
    "publishedYear": 2023,
    "genre": "string",
    "stock": 5
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book created successfully",
    "data": {
      "_id": "64f2d9e2d3a...",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "publishedYear": 2008,
      "genre": "Programming",
      "stock": 12
    }
  }
  ```

#### Get All Books
- **Method**: `GET`
- **Endpoint**: `/api/books`
- **Query Parameters**:
  - `genre`: Filter by genre
  - `author`: Filter by author
  - `minYear`: Minimum published year
  - `available`: `true` for books with stock > 0
  - `limit`: Number of books per page (default: 10)
  - `offset`: Starting index for pagination (default: 0)

- **Example Request**:
  ```
  GET /books?genre=sports&author=test%20name%202&minYear=2023&available=true&limit=10&offset=0
  ```

- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Books fetched successfully",
    "data": {
      "total": 27,
      "limit": 5,
      "offset": 10,
      "results": [
        {
          "_id": "64f2d9e2d3a...",
          "title": "Clean Code",
          "author": "Robert C. Martin",
          "publishedYear": 2008,
          "genre": "Programming",
          "stock": 12
        }
      ]
    }
  }
  ```

#### Checkout Book
- **Method**: `POST`
- **Endpoint**: `/api/books/:id/checkout`
- **Authentication**: Required (JWT)
- **Validations**:
  - Book must exist
  - Book must have available stock (stock > 0)

- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Book checked out successfully",
    "data": {
      "_id": "68b17915070b878128f92eb0",
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "publishedYear": 2008,
      "genre": "Programming",
      "stock": 11,
      "createdAt": "2025-08-29T09:55:33.155Z",
      "updatedAt": "2025-08-29T10:10:00.000Z"
    }
  }
  ```

## Response Format
All API endpoints return a standardized JSON response:

```json
{
  "success": boolean,
  "message": "string",
  "data": object | array | null,
  "token": "string" // Only for login endpoint
}
```

## Testing
Test all endpoints using Postman or any API testing tool. Ensure to:
1. First register a user
2. Login to get the JWT token
3. Use the token in the Token header for protected routes

---

Made with ❤️ by Aadil