const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// GET: Mengambil semua data product
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Mengambil data product berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Menambahkan product baru (single)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ error: 'Name, price, and stock are required' });
    }
    
    const product = await Product.create({ name, description, price, stock, category });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Menambahkan multiple products dalam 1 request (bulk create)
router.post('/bulk', async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Products array is required' });
    }
    
    // Validate all products
    for (const product of products) {
      if (!product.name || product.price === undefined || product.stock === undefined) {
        return res.status(400).json({ 
          error: 'Each product must have name, price, and stock' 
        });
      }
    }
    
    const createdProducts = await Product.bulkCreate(products);
    res.status(201).json({ 
      message: `Successfully created ${createdProducts.length} product(s)`,
      products: createdProducts 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Memperbarui data product berdasarkan ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;
    
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.update({ name, description, price, stock, category });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Menghapus data product berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

