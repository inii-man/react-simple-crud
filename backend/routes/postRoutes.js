const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

// GET: Mengambil semua data post
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      }],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Mengambil data post berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      }],
    });
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Menambahkan post baru ke database
router.post('/', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    
    if (!title || !content || !userId) {
      return res.status(400).json({ error: 'Title, content, and userId are required' });
    }
    
    // Cek apakah user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const post = await Post.create({ title, content, userId });
    const postWithUser = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      }],
    });
    
    res.status(201).json(postWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Memperbarui data post berdasarkan ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await post.update({ title, content });
    const updatedPost = await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      }],
    });
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Menghapus data post berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

