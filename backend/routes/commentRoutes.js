const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');

// GET: Mengambil semua data comment
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Mengambil data comment berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title', 'content'],
        },
      ],
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Menambahkan comment baru ke database
router.post('/', async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    
    if (!content || !postId || !userId) {
      return res.status(400).json({ error: 'Content, postId, and userId are required' });
    }
    
    // Cek apakah post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Cek apakah user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const comment = await Comment.create({ content, postId, userId });
    const commentWithRelations = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title'],
        },
      ],
    });
    
    res.status(201).json(commentWithRelations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Memperbarui data comment berdasarkan ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    await comment.update({ content });
    const updatedComment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title'],
        },
      ],
    });
    
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Menghapus data comment berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

