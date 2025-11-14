import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "../Ts/products";
import { useCart } from "../context/CartContext";

const url = "https://dummyjson.com/products";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(url);
            setProducts(data.products);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4 fw-bold text-center">Our Products</h1>
            <div className="row g-4">
                {products.map((item) => (
                    <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card h-100 shadow-sm border-0">
                            <img
                                src={item.thumbnail}
                                className="card-img-top"
                                alt={item.title}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title text-dark fw-bold">{item.title}</h5>
                                <p className="card-text text-muted flex-grow-1" style={{ fontSize: "0.9rem" }}>
                                    {item.description.length > 60
                                        ? item.description.substring(0, 60) + "..."
                                        : item.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className="fw-bold text-primary">${item.price.toFixed(2)}</span>
                                    <button
                                        className="btn btn-sm btn-success shadow-sm"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="card-footer bg-transparent border-top-0 text-muted text-center">
                                Category: {item.category}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
