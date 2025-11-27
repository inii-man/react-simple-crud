# Postman Collection - API Testing Guide

## Setup Postman

1. Buka Postman
2. Pastikan backend server berjalan di `http://localhost:3000`

## Users Endpoints

### 1. GET All Users
- **Method:** GET
- **URL:** `http://localhost:3000/api/users`
- **Body:** Tidak ada
- **Expected Response:** Array of users dengan posts

### 2. GET User by ID
- **Method:** GET
- **URL:** `http://localhost:3000/api/users/1`
- **Body:** Tidak ada
- **Expected Response:** User object dengan posts

### 3. POST Create User
- **Method:** POST
- **URL:** `http://localhost:3000/api/users`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
- **Expected Response:** Created user object

### 4. PUT Update User
- **Method:** PUT
- **URL:** `http://localhost:3000/api/users/1`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```
- **Expected Response:** Updated user object

### 5. DELETE User
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/users/1`
- **Body:** Tidak ada
- **Expected Response:** 204 No Content

## Posts Endpoints

### 1. GET All Posts
- **Method:** GET
- **URL:** `http://localhost:3000/api/posts`
- **Body:** Tidak ada
- **Expected Response:** Array of posts dengan user info

### 2. GET Post by ID
- **Method:** GET
- **URL:** `http://localhost:3000/api/posts/1`
- **Body:** Tidak ada
- **Expected Response:** Post object dengan user info

### 3. POST Create Post
- **Method:** POST
- **URL:** `http://localhost:3000/api/posts`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "userId": 1
}
```
- **Expected Response:** Created post object dengan user info

### 4. PUT Update Post
- **Method:** PUT
- **URL:** `http://localhost:3000/api/posts/1`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "title": "Updated Post Title",
  "content": "Updated content here."
}
```
- **Expected Response:** Updated post object

### 5. DELETE Post
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/posts/1`
- **Body:** Tidak ada
- **Expected Response:** 204 No Content

## Testing Flow

1. **Create a User:**
   - POST `/api/users` dengan name dan email
   - Simpan `id` dari response

2. **Get All Users:**
   - GET `/api/users`
   - Verifikasi user yang baru dibuat ada di list

3. **Get User by ID:**
   - GET `/api/users/{id}`
   - Verifikasi data user sesuai

4. **Create a Post:**
   - POST `/api/posts` dengan title, content, dan userId
   - Simpan `id` dari response

5. **Get All Posts:**
   - GET `/api/posts`
   - Verifikasi post yang baru dibuat ada di list

6. **Update User:**
   - PUT `/api/users/{id}` dengan data baru
   - Verifikasi perubahan

7. **Update Post:**
   - PUT `/api/posts/{id}` dengan data baru
   - Verifikasi perubahan

8. **Delete Post:**
   - DELETE `/api/posts/{id}`
   - Verifikasi post terhapus (GET `/api/posts`)

9. **Delete User:**
   - DELETE `/api/users/{id}`
   - Verifikasi user terhapus (GET `/api/users`)

## Comments Endpoints

### 1. GET All Comments
- **Method:** GET
- **URL:** `http://localhost:3000/api/comments`
- **Body:** Tidak ada
- **Expected Response:** Array of comments dengan user dan post info

### 2. GET Comment by ID
- **Method:** GET
- **URL:** `http://localhost:3000/api/comments/1`
- **Body:** Tidak ada
- **Expected Response:** Comment object dengan user dan post info

### 3. POST Create Comment
- **Method:** POST
- **URL:** `http://localhost:3000/api/comments`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "content": "This is a great post!",
  "postId": 1,
  "userId": 1
}
```
- **Expected Response:** Created comment object dengan user dan post info

### 4. PUT Update Comment
- **Method:** PUT
- **URL:** `http://localhost:3000/api/comments/1`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "content": "Updated comment content here."
}
```
- **Expected Response:** Updated comment object

### 5. DELETE Comment
- **Method:** DELETE
- **URL:** `http://localhost:3000/api/comments/1`
- **Body:** Tidak ada
- **Expected Response:** 204 No Content

## Extended Testing Flow

10. **Create a Comment:**
    - POST `/api/comments` dengan content, postId, dan userId
    - Simpan `id` dari response

11. **Get All Comments:**
    - GET `/api/comments`
    - Verifikasi comment yang baru dibuat ada di list

12. **Get Comment by ID:**
    - GET `/api/comments/{id}`
    - Verifikasi data comment sesuai

13. **Update Comment:**
    - PUT `/api/comments/{id}` dengan content baru
    - Verifikasi perubahan

14. **Delete Comment:**
    - DELETE `/api/comments/{id}`
    - Verifikasi comment terhapus (GET `/api/comments`)

## Error Cases to Test

1. **Create User dengan email yang sudah ada:**
   - POST `/api/users` dengan email yang sudah digunakan
   - Expected: 400 Bad Request dengan error message

2. **Get User dengan ID yang tidak ada:**
   - GET `/api/users/999`
   - Expected: 404 Not Found

3. **Create Post dengan userId yang tidak ada:**
   - POST `/api/posts` dengan userId yang tidak valid
   - Expected: 404 Not Found

4. **Create User tanpa required fields:**
   - POST `/api/users` tanpa name atau email
   - Expected: 400 Bad Request

5. **Create Comment dengan postId yang tidak ada:**
   - POST `/api/comments` dengan postId yang tidak valid
   - Expected: 404 Not Found

6. **Create Comment dengan userId yang tidak ada:**
   - POST `/api/comments` dengan userId yang tidak valid
   - Expected: 404 Not Found

7. **Create Comment tanpa required fields:**
   - POST `/api/comments` tanpa content, postId, atau userId
   - Expected: 400 Bad Request

