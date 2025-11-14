import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import CartPopup from "./CartPopup";


const Header = () => {
    const { cart } = useCart();
    const [openCart, setOpenCart] = useState(false)

    return (
        <nav className="navbar navbar-expand-lg bg-dark px-4 py-2">
            <div className="container-fluid d-flex justify-space-between">

                {/* Logo */}
                <Link className="navbar-brand text-white fw-bold me-4" to="/">
                    MyShop
                </Link>

                {/* Thanh tìm kiếm */}
                <form className="d-flex flex-grow-1 me-4" role="search">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search products..."
                    />
                    <button className="btn btn-primary ms-2" type="submit">
                        Search
                    </button>
                </form>

                {/* Icons bên phải */}
                <div className="d-flex align-items-center">

                    {/* Icon giỏ hàng */}
                    <Link to="/cart" className="text-white me-3 position-relative">
                        <i className="fa-solid fa-cart-shopping" onMouseEnter={() => { setOpenCart(true) }} ></i>

                        {/* Badge số lượng (nếu muốn) */}
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: "12px" }}
                        >
                            {cart.length}
                        </span>
                    </Link>

                </div>
            </div>
            {openCart && <CartPopup openCart={openCart} setOpenCart={setOpenCart} />}
        </nav>
    );
};

export default Header;
