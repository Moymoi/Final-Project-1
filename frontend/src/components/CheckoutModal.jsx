import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const CheckoutModal = ({ show, onHide, product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');

  const handleCheckout = () => {
    if (!token || !user) {
      // Redirect to login page
      onHide();
      navigate('/login');
      return;
    }

    // Proceed with checkout
    alert(`Added ${quantity} ${product.name} to cart! (Checkout coming soon)`);
    onHide();
  };

  const handleLoginClick = () => {
    onHide();
    navigate('/login');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        {token ? (
          <Button variant="primary" onClick={handleCheckout}>
            Buy Now
          </Button>
        ) : (
          <Button variant="primary" onClick={handleLoginClick}>
            Login to Purchase
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
