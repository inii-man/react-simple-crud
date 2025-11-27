import React, { useState } from 'react';
import { productAPI } from '../services/api';

const ProductFormRepeater = ({ onSuccess, onCancel }) => {
  const [items, setItems] = useState([
    { name: '', description: '', price: '', stock: '', category: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddRow = () => {
    setItems([...items, { name: '', description: '', price: '', stock: '', category: '' }]);
  };

  const handleRemoveRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate all items
    const invalidItems = items.filter(item => !item.name || !item.price || !item.stock);
    if (invalidItems.length > 0) {
      setError('Please fill all required fields (name, price, stock) for all products');
      setLoading(false);
      return;
    }

    try {
      // Prepare data for bulk create (single POST request)
      const productsData = items.map(item => ({
        name: item.name,
        description: item.description || null,
        price: parseFloat(item.price),
        stock: parseInt(item.stock),
        category: item.category || null,
      }));

      // Submit all products in 1 POST request
      const response = await productAPI.createProductsBulk(productsData);
      
      setSuccess(`Successfully created ${response.products.length} product(s)!`);
      
      // Reset form
      setItems([{ name: '', description: '', price: '', stock: '', category: '' }]);

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Multiple Products (Form Repeater)</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Add multiple products at once. All products will be submitted in a single request.
        Click "Add Row" to add more product fields.
      </p>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px',
            backgroundColor: '#fafafa',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Product #{index + 1}</h3>
              {items.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveRow(index)}
                  disabled={loading}
                  style={{ padding: '5px 15px', fontSize: '12px' }}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`name-${index}`}>Product Name *</label>
              <input
                type="text"
                id={`name-${index}`}
                name={`name-${index}`}
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor={`description-${index}`}>Description</label>
              <textarea
                id={`description-${index}`}
                name={`description-${index}`}
                value={item.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                disabled={loading}
                rows="2"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <div className="form-group">
                <label htmlFor={`price-${index}`}>Price *</label>
                <input
                  type="number"
                  id={`price-${index}`}
                  name={`price-${index}`}
                  value={item.price}
                  onChange={(e) => handleChange(index, 'price', e.target.value)}
                  required
                  disabled={loading}
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`stock-${index}`}>Stock *</label>
                <input
                  type="number"
                  id={`stock-${index}`}
                  name={`stock-${index}`}
                  value={item.stock}
                  onChange={(e) => handleChange(index, 'stock', e.target.value)}
                  required
                  disabled={loading}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`category-${index}`}>Category</label>
                <input
                  type="text"
                  id={`category-${index}`}
                  name={`category-${index}`}
                  value={item.category}
                  onChange={(e) => handleChange(index, 'category', e.target.value)}
                  disabled={loading}
                  placeholder="e.g., Electronics"
                />
              </div>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddRow}
            disabled={loading}
          >
            + Add Row
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : `Submit ${items.length} Product(s) in 1 Request`}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductFormRepeater;

