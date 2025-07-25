# Notely API

A simple RESTful API for a note-taking application built with **TypeScript**, **Node.js**, **Express**, and **MongoDB**. Supports user authentication with **JWT**, full **CRUD operations** on notes, and **query filtering** by title and date.

## Features

- 🔐 **User Authentication** - JWT-based registration and login
- 📝 **Note Management** - Create, read, update, and delete notes
- 🔍 **Search & Filter** - Search notes by title/content and filter by date
- 📄 **Pagination** - Efficient pagination for large datasets
- 🛡️ **Security** - Password hashing, input validation, and authentication middleware
- 🚀 **TypeScript** - Full type safety and better development experience

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: bcryptjs for password hashing

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notely-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/notely-api
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

4. **Start MongoDB**
   - **Local MongoDB**: `mongod`
   - **MongoDB Atlas**: Use the connection string in `MONGODB_URI`

5. **Development Server**
   ```bash
   npm run dev
   ```

6. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt-token>
```

### Notes

All note endpoints require authentication (Bearer token).

#### Create Note
```http
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note."
}
```

#### Get All Notes (with filtering)
```http
GET /api/notes?page=1&limit=10&title=search&dateFrom=2023-01-01&dateTo=2023-12-31
Authorization: Bearer <jwt-token>
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `title`: Search by title (case-insensitive)
- `dateFrom`: Filter notes from this date (ISO 8601)
- `dateTo`: Filter notes to this date (ISO 8601)

#### Get Single Note
```http
GET /api/notes/:id
Authorization: Bearer <jwt-token>
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <jwt-token>
```

#### Search Notes
```http
GET /api/notes/search?q=search-term&page=1&limit=10
Authorization: Bearer <jwt-token>
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error description"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Success message",
  "data": [
    // Array of items
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Database Schema

### User Schema
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Note Schema
```javascript
{
  title: { type: String, required: true, maxLength: 200 },
  content: { type: String, required: true, maxLength: 10000 },
  userId: { type: String, required: true, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory

## Testing the API

You can test the API using tools like:
- **Postman** - Import the endpoints and test
- **curl** - Use command line to test endpoints
- **REST Client** - VS Code extension for testing APIs
