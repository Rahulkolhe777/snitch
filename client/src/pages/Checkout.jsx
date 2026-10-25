import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '../hooks/useCart';
import CartSummary from '../components/cart/CartSummary';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod', // 'cod' | 'upi'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="cart-page-empty">
        <h2>Your Bag is Empty</h2>
        <p>Add some products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="checkout-success-container">
        <span className="success-icon">🎉</span>
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with Snitch. Your order has been placed successfully.</p>
        <Button onClick={() => navigate('/shop')} variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Secure Checkout</h1>

      <div className="checkout-grid">
        {/* Shipping details */}
        <div className="checkout-form-column">
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-section">
              <h3>1. Shipping Address</h3>
              <div className="form-row">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                label="Street Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />

              <div className="form-row three-col">
                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="PIN Code"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <h3>2. Payment Method</h3>
              <div className="payment-options">
                <label className="payment-radio-card">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <p>Pay with cash or UPI upon delivery</p>
                  </div>
                </label>

                <label className="payment-radio-card">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={form.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                  <div>
                    <strong>Instant UPI / Cards / NetBanking</strong>
                    <p>Secured 256-bit encrypted payment gateway</p>
                  </div>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="btn-block"
              isLoading={isSubmitting}
            >
              Confirm & Place Order
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout-summary-column">
          <CartSummary showCheckoutButton={false} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
