import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './CheckoutModal.css';

const CheckoutModal = ({ show, onHide, product, chosenProduct, userId }) => {
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
    alert(`Added ${quantity} x ${chosenProduct.amount} ${chosenProduct.unit} to cart! (Checkout coming soon)`);
    onHide();
  };

  const handleLoginClick = () => {
    onHide();
    navigate('/login');
  };

  const total = (chosenProduct?.price * quantity).toFixed(2);

  return (
    <Modal show={show} onHide={onHide} centered className="checkout-modal">
      <Modal.Header closeButton className="checkout-header">
        <Modal.Title className="checkout-title">{product?.name} - Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body className="checkout-body">
        <p className="product-description">User ID: <strong>{userId}</strong></p>
        
        <div className="price-section">
          <div className="price-row">
            <span className="price-label">Package:</span>
            <span className="price-value">{chosenProduct?.amount} {chosenProduct?.unit}</span>
          </div>
          <div className="price-row">
            <span className="price-label">Price per unit:</span>
            <span className="price-value">${chosenProduct?.price}</span>
          </div>
        </div>

        <div className="quantity-section">
          <label className="quantity-label">Quantity:</label>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="quantity-input"
          />
        </div>

        <div className="total-section">
          <span className="total-label">Total:</span>
          <span className="total-value">${total}</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="checkout-footer">
        <Button variant="secondary" onClick={onHide} className="cancel-btn">
          Cancel
        </Button>
        {token ? (
          <Button variant="primary" onClick={handleCheckout} className="purchase-btn">
            Buy Now
          </Button>
        ) : (
          <Button variant="danger" onClick={handleLoginClick} className="login-btn">
            Login to Purchase
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
