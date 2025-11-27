import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { productAPI } from '../services/api';
import ProductModal from './ProductModal';
import './ProductModal.css';

const ProductList = forwardRef((props, ref) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useImperativeHandle(ref, () => ({
    refresh: fetchProducts
  }));

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend server is running.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    setDeleting(true);
    try {
      await productAPI.deleteProduct(productToDelete.id);
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Products List</h2>
        <button className="btn btn-success" onClick={handleCreate}>
          + Create New Product
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
          <button className="btn btn-primary" onClick={fetchProducts} style={{ marginLeft: '10px' }}>
            Retry
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <p>No products found. Create your first product!</p>
      ) : (
        <div className="grid">
          {products.map(product => (
            <div key={product.id} className="card">
              <h3>{product.name}</h3>
              {product.description && (
                <p>{product.description.substring(0, 100)}{product.description.length > 100 ? '...' : ''}</p>
              )}
              <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              {product.category && (
                <p><strong>Category:</strong> <span className="badge badge-primary">{product.category}</span></p>
              )}
              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSuccess={handleModalSuccess}
      />

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="delete-modal-overlay" onClick={() => setDeleteModalOpen(false)}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>? This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setProductToDelete(null);
                }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;

