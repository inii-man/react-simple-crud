# Day 3 - Backend Development & Integrasi API

Proyek lengkap untuk pembelajaran Backend Development dengan Node.js + Express + Sequelize dan integrasi dengan React Frontend.

## 📋 Fitur

- ✅ Setup Backend menggunakan Node.js + Express
- ✅ Model dan Relasi Database dengan Sequelize (User & Post - One-to-Many)
- ✅ Implementasi Endpoint REST API (GET, POST, PUT, DELETE)
- ✅ Testing API dengan Postman
- ✅ Integrasi React dengan API menggunakan Axios
- ✅ Menampilkan Data List dan Detail
- ✅ Error Handling, Loading State, dan Form Submission

## 🏗️ Struktur Proyek

```
day3/
├── backend/          # Backend API (Node.js + Express + Sequelize)
│   ├── config/      # Konfigurasi database
│   ├── models/      # Model Sequelize (User, Post)
│   ├── routes/      # Route handlers
│   └── server.js    # Entry point server
│
└── frontend/        # Frontend React
    ├── src/
    │   ├── components/  # Komponen React
    │   ├── services/    # API service dengan Axios
    │   └── App.js       # Main component
    └── public/
```

## 🚀 Setup & Instalasi

### Prerequisites

- Node.js (v14 atau lebih baru)
- MySQL (atau database SQL lainnya)
- npm atau yarn

### 1. Setup Database

Buat database MySQL:

```sql
CREATE DATABASE day3_db;
```

### 2. Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Copy file .env.example ke .env dan edit konfigurasi database
cp .env.example .env

# Edit file .env dengan konfigurasi database Anda
# DB_NAME=day3_db
# DB_USER=root
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=3306
# PORT=3000

# Jalankan server
npm start
# atau untuk development dengan auto-reload
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 3. Setup Frontend

Buka terminal baru:

```bash
# Masuk ke folder frontend
cd frontend

# Install dependencies
npm install

# Jalankan aplikasi React
npm start
```

Aplikasi React akan berjalan di `http://localhost:3000` (atau port lain jika 3000 sudah digunakan)

## 📡 API Endpoints

### Users

- `GET /api/users` - Mengambil semua users
- `GET /api/users/:id` - Mengambil user berdasarkan ID
- `POST /api/users` - Membuat user baru
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Hapus user

### Posts

- `GET /api/posts` - Mengambil semua posts
- `GET /api/posts/:id` - Mengambil post berdasarkan ID
- `POST /api/posts` - Membuat post baru
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Hapus post

### Comments

- `GET /api/comments` - Mengambil semua comments
- `GET /api/comments/:id` - Mengambil comment berdasarkan ID
- `POST /api/comments` - Membuat comment baru
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Hapus comment

## 🧪 Testing dengan Postman

1. Buka Postman
2. Pilih metode HTTP (GET, POST, PUT, DELETE)
3. Masukkan URL endpoint, contoh:
   - `GET http://localhost:3000/api/users`
   - `POST http://localhost:3000/api/users`
     - Body (raw JSON):
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com"
     }
     ```
4. Klik "Send" untuk mengirim request

## 📚 Materi yang Dipelajari

### Backend

1. **Express.js Setup**
   - Membuat server dengan Express
   - Middleware (CORS, JSON parser)
   - Route handling

2. **Sequelize ORM**
   - Koneksi database
   - Membuat model (User, Post)
   - Relasi One-to-Many
   - Sinkronisasi database

3. **REST API**
   - GET: Mengambil data
   - POST: Membuat data baru
   - PUT: Update data
   - DELETE: Hapus data
   - Error handling

### Frontend

1. **Axios Integration**
   - Setup Axios instance
   - API service functions
   - Error handling

2. **React Components**
   - List components (UserList, PostList)
   - Detail components (UserDetail, PostDetail)
   - Form components (UserForm, PostForm)

3. **State Management**
   - useState untuk local state
   - useEffect untuk data fetching
   - Loading states
   - Error states

4. **User Experience**
   - Loading indicators
   - Error messages
   - Success notifications
   - Form validation

## 🎯 Fitur Aplikasi

- ✅ CRUD lengkap untuk Users, Posts, dan Comments
- ✅ Relasi One-to-Many (User memiliki banyak Posts)
- ✅ Relasi One-to-Many (Post memiliki banyak Comments)
- ✅ Relasi One-to-Many (User memiliki banyak Comments)
- ✅ Menampilkan list dengan loading state (Data Repeater)
- ✅ Detail view dengan informasi lengkap
- ✅ Form untuk create dan edit
- ✅ Error handling yang user-friendly
- ✅ Responsive design

## 📝 Catatan

- Pastikan MySQL server berjalan sebelum menjalankan backend
- Backend harus berjalan sebelum frontend dapat mengambil data
- Database akan otomatis dibuat tabel saat pertama kali menjalankan server (dengan `sequelize.sync()`)

## 🔧 Troubleshooting

### Database connection error
- Pastikan MySQL server berjalan
- Periksa konfigurasi di file `.env`
- Pastikan database sudah dibuat

### CORS error
- Pastikan backend sudah menginstall dan menggunakan `cors` middleware
- Pastikan backend berjalan di port yang benar

### Port already in use
- Ubah PORT di file `.env` backend
- Atau hentikan proses yang menggunakan port tersebut

## 📖 Referensi

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Axios Documentation](https://axios-http.com/)
- [React Documentation](https://react.dev/)

---

**Selamat Belajar! 🎉**

