import React, { useState, useRef } from 'react';
import ProductList from '../components/ProductList';
import ProductFormRepeater from '../components/ProductFormRepeater';

const ProductsPage = () => {
  const [showRepeater, setShowRepeater] = useState(false);
  const productListRef = useRef(null);

  const handleRepeaterSuccess = () => {
    setShowRepeater(false);
    // Trigger refresh in ProductList
    if (productListRef.current && productListRef.current.refresh) {
      productListRef.current.refresh();
    }
  };

  return (
    <div>
      {!showRepeater && (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button className="btn btn-success" onClick={() => setShowRepeater(true)}>
            + Create Multiple Products (Repeater - 1 POST)
          </button>
        </div>
      )}

      {showRepeater ? (
        <ProductFormRepeater
          onSuccess={handleRepeaterSuccess}
          onCancel={() => setShowRepeater(false)}
        />
      ) : (
        <ProductList ref={productListRef} />
      )}
    </div>
  );
};

export default ProductsPage;

