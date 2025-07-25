# API Testing Examples

## Test the API endpoints using curl or any REST client

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login user
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Get user profile (requires authentication)
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Create a note (requires authentication)
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "My First Note",
    "content": "This is the content of my first note using the API."
  }'
```

### 5. Get all notes (requires authentication)
```bash
curl -X GET http://localhost:3000/api/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 6. Get notes with filtering
```bash
curl -X GET "http://localhost:3000/api/notes?page=1&limit=5&title=first" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 7. Get a specific note (requires authentication)
```bash
curl -X GET http://localhost:3000/api/notes/NOTE_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 8. Update a note (requires authentication)
```bash
curl -X PUT http://localhost:3000/api/notes/NOTE_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "Updated Note Title",
    "content": "Updated content for the note."
  }'
```

### 9. Search notes (requires authentication)
```bash
curl -X GET "http://localhost:3000/api/notes/search?q=first&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 10. Delete a note (requires authentication)
```bash
curl -X DELETE http://localhost:3000/api/notes/NOTE_ID_HERE \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Expected Response Formats

### Registration/Login Success
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6507f1f0c8b8b8c8b8c8b8c8",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2023-09-18T10:30:00.000Z"
    }
  }
}
```

### Notes List Success
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [
    {
      "_id": "6507f1f0c8b8b8c8b8c8b8c8",
      "title": "My First Note",
      "content": "This is the content of my first note.",
      "userId": "6507f1f0c8b8b8c8b8c8b8c9",
      "createdAt": "2023-09-18T10:30:00.000Z",
      "updatedAt": "2023-09-18T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

## Testing with Postman

1. Import these endpoints into Postman
2. Set up environment variables:
   - `baseUrl`: `http://localhost:3000`
   - `token`: (set this after login)
3. Use the token in Authorization header as "Bearer Token"

## Testing Workflow

1. Register a new user
2. Login with the user credentials
3. Copy the JWT token from the response
4. Use the token to access protected endpoints
5. Test all CRUD operations on notes
6. Test filtering and search functionality
