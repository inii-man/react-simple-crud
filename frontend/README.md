# Frontend React - Day 3

Frontend React dengan integrasi Backend API menggunakan Axios.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Pastikan backend server sudah berjalan di `http://localhost:3000`

3. Jalankan aplikasi:
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000` (atau port lain jika 3000 sudah digunakan)

## Struktur

- `src/components/` - Komponen React
  - `UserList.js` - Menampilkan daftar users
  - `UserDetail.js` - Menampilkan detail user
  - `UserForm.js` - Form untuk create/edit user
  - `PostList.js` - Menampilkan daftar posts
  - `PostDetail.js` - Menampilkan detail post
  - `PostForm.js` - Form untuk create/edit post

- `src/services/api.js` - API service dengan Axios
- `src/App.js` - Main component dengan routing logic

## Fitur

- ✅ List view dengan loading state
- ✅ Detail view
- ✅ Create form
- ✅ Edit form
- ✅ Delete dengan konfirmasi
- ✅ Error handling
- ✅ Success notifications

