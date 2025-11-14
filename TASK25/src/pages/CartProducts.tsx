import { useCart } from "../context/CartContext";

const CartProducts = () => {
    const { cart, addToCart, giamQuantity, removeCart } = useCart();

    const totalAmount = cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-bold text-dark">Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <h5 className="text-muted">Your cart is empty.</h5>
                    <p className="text-muted">Add some products to get started!</p>
                </div>
            ) : (
                <div className="table-responsive shadow rounded-3 p-3 bg-white">
                    <table className="table align-middle text-center mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Thumbnail</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr
                                    key={item.id}
                                    className="align-middle"
                                    style={{ transition: "all 0.3s", cursor: "pointer" }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor = "#f8f9fa")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor = "transparent")
                                    }
                                >
                                    <td>
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="img-fluid rounded"
                                            style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className="fw-semibold text-dark">{item.title}</td>
                                    <td className="text-primary fw-bold">${item.price.toFixed(2)}</td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                className="btn btn-sm btn-outline-secondary me-2"
                                                onClick={() => giamQuantity(item)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 fw-bold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline-secondary ms-2"
                                                onClick={() => addToCart(item)}
                                                disabled={item.quantity >= 99}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="fw-bold text-success">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger shadow-sm"
                                            onClick={() => removeCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Tổng tiền */}
                    <div className="d-flex justify-content-end mt-4 align-items-center">
                        <h5 className="me-4 fw-bold text-dark">
                            Total:
                            <span className="text-success ms-2">${totalAmount}</span>
                        </h5>
                        <button className="btn btn-primary btn-lg shadow">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartProducts;
