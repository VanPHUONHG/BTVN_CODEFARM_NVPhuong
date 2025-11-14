import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface CartSidebarProps {
    openCart: boolean;
    setOpenCart: (value: boolean) => void;
}

const CartPopup: React.FC<CartSidebarProps> = ({ openCart, setOpenCart }) => {
    const { cart, removeCart, addToCart, giamQuantity } = useCart();

    const totalAmount = cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    if (!openCart) return null;

    return (
        <div
            className="position-fixed top-0 end-0 vh-100 bg-white shadow"
            style={{ width: "350px", zIndex: 9999, overflowY: "auto", transition: "transform 0.3s" }}
        >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="m-0">Your Cart ({cart.length})</h5>
                <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setOpenCart(false)}
                >
                    &times;
                </button>
            </div>

            {/* Items */}
            <div className="p-3">
                {cart.length === 0 ? (
                    <p className="text-center text-muted">Cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex align-items-center mb-3 border-bottom pb-2"
                        >
                            {/* Thumbnail */}
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                                className="me-2"
                            />

                            {/* Info */}
                            <div className="flex-grow-1">
                                <h6 className="mb-1" style={{ fontSize: "14px" }}>
                                    {item.title}
                                </h6>
                                <p className="mb-1 text-muted" style={{ fontSize: "12px" }}>
                                    ${item.price.toFixed(2)}
                                </p>
                                <div className="d-flex align-items-center gap-1">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => giamQuantity(item)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total & remove */}
                            <div className="text-end ms-2">
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                <div>
                                    <button
                                        className="btn btn-sm btn-danger mt-1"
                                        onClick={() => removeCart(item.id)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {/* Tổng tiền */}
                <div className="d-flex justify-content-between mt-3 pt-3">
                    <strong>Total:</strong>
                    <span>${totalAmount}</span>
                </div>

                <Link to={`/cart`}>Checkout</Link>
            </div>
        </div>
    );
};

export default CartPopup;
