import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API functions
export const userAPI = {
  // GET: Mengambil semua data user
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // GET: Mengambil data user berdasarkan ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // POST: Menambahkan user baru
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // PUT: Memperbarui data user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // DELETE: Menghapus data user
  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },
};

// Post API functions
export const postAPI = {
  // GET: Mengambil semua data post
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  // GET: Mengambil data post berdasarkan ID
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // POST: Menambahkan post baru
  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  // PUT: Memperbarui data post
  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  // DELETE: Menghapus data post
  deletePost: async (id) => {
    await api.delete(`/posts/${id}`);
  },
};

// Comment API functions
export const commentAPI = {
  // GET: Mengambil semua data comment
  getAllComments: async () => {
    const response = await api.get('/comments');
    return response.data;
  },

  // GET: Mengambil data comment berdasarkan ID
  getCommentById: async (id) => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  // POST: Menambahkan comment baru
  createComment: async (commentData) => {
    const response = await api.post('/comments', commentData);
    return response.data;
  },

  // PUT: Memperbarui data comment
  updateComment: async (id, commentData) => {
    const response = await api.put(`/comments/${id}`, commentData);
    return response.data;
  },

  // DELETE: Menghapus data comment
  deleteComment: async (id) => {
    await api.delete(`/comments/${id}`);
  },
};

// Product API functions
export const productAPI = {
  // GET: Mengambil semua data product
  getAllProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // GET: Mengambil data product berdasarkan ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // POST: Menambahkan product baru (single)
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // POST: Menambahkan multiple products dalam 1 request (bulk create)
  createProductsBulk: async (productsArray) => {
    const response = await api.post('/products/bulk', { products: productsArray });
    return response.data;
  },

  // PUT: Memperbarui data product
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // DELETE: Menghapus data product
  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
  },
};

export default api;

