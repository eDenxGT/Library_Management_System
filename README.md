# Library Management System API

A RESTful API for managing books in a library system with JWT authentication, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**. This project was developed as an interview task, focusing on clean code structure, proper validation, and error handling.

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
    - [Authentication](#authentication-endpoints)
      - [Register User](#register-user)
      - [User Login](#user-login)
    - [Books](#book-endpoints)
      - [Create Book](#create-book)
      - [Get All Books](#get-all-books)
      - [Checkout Book](#checkout-book)
- [Response Format](#response-format)
- [Testing](#testing)
- [Submission](#submission)

## Requirements

### 1. Authentication Module
- JWT-based authentication
- User registration and login endpoints
- Input validation for user credentials

### 2. Book Management Module
- Create books with validation
- Retrieve books with filtering and pagination
- Book checkout functionality with stock validation

### 3. Technical Requirements
- Express.js framework
- MongoDB with Mongoose
- Middleware for authentication, validation, and error handling
- Clean, modular code structure
- Basic logging

## Technologies Used
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Language**: TypeScript
- **Validation**: Built-in validation with Express Validator
- **Logging**: Winston or Morgan

## Getting Started

### Prerequisites
- Node.js (v14 or later)
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
http://localhost:5000/api
```

### Authentication
All protected routes require JWT authentication. Include the token in the request header:
```
Authorization: Bearer <your_jwt_token>
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
  GET /books?genre=Programming&author=Martin&minYear=2000&available=true&limit=5&offset=10
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
3. Use the token in the Authorization header for protected routes

## Submission
Please submit your solution by sharing the repository URL with the following email addresses:
- ananthu.askeva@gmail.com
- productmanager@tunepath.com
- hr@tunepath.com

