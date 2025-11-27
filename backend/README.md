# Backend API - Day 3

Backend API menggunakan Node.js, Express, dan Sequelize.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Buat file `.env` dari `.env.example`:

```bash
cp .env.example .env
```

3. Edit file `.env` dengan konfigurasi database Anda:

```
DB_NAME=day3_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
PORT=3000
```

4. Pastikan MySQL database sudah dibuat:

```sql
CREATE DATABASE day3_db;
```

5. Jalankan server:

```bash
npm start
# atau untuk development
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments

- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

## Struktur

- `config/database.js` - Konfigurasi koneksi Sequelize
- `models/` - Model Sequelize (User, Post)
- `routes/` - Route handlers untuk API
- `server.js` - Entry point aplikasi
