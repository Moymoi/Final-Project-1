import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';

const CheckoutModal = ({ show, onHide, product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  const handleCheckout = () => {
    if (!token || !user) {
      setError('You must be logged in to purchase items');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    // Proceed with checkout
    alert(`Added ${quantity} ${product.name} to cart! (Checkout coming soon)`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="warning" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        <p className="text-muted">{product?.description}</p>
        <div className="my-3">
          <h5>Price: ${product?.price}</h5>
          <div className="d-flex align-items-center">
            <label className="me-2">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product?.stock || 10}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control"
              style={{ width: '80px' }}
            />
          </div>
          <p className="mt-3">
            <strong>Total: ${(product?.price * quantity).toFixed(2)}</strong>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCheckout}
          className={!token ? 'disabled' : ''}
        >
          {token ? 'Buy Now' : 'Login to Purchase'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
