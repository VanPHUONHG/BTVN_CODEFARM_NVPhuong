// src/App.tsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useCart } from "./context/CartContext";
import type { Product } from "./types/product";

function App() {
  const { cart, addToCart, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products as Product[]);
      setError(null);
    } catch (err) {
      setError("Không thể tải sản phẩm. Vui lòng thử lại!");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  // ======= Giao diện =======
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1a] to-[#1e1b4b] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-300 text-lg tracking-widest uppercase font-light">
            Đang khởi tạo vũ trụ sản phẩm...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0a0f1a] to-[#1e1b4b] flex items-center justify-center">
        <div className="text-center bg-[#0f172a]/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-cyan-500/30">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-all"
          >
            Tái tạo dữ liệu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050505] text-slate-100">
      {/* Nền vũ trụ phủ toàn màn */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a0f1a] to-[#1a1a40]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,255,0.15),transparent_70%)] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/space-texture.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_40%_40%,rgba(88,28,135,0.15),transparent_60%)]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-2xl border-b border-cyan-500/20 shadow-md">
        <div className="w-full px-8 md:px-16 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            MULTIVERSE STORE
          </h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
          >
            <ShoppingCart className="w-6 h-6 text-cyan-400" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a]/90 border border-cyan-500/40 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.4)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-cyan-500/30 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                Giỏ hàng ({totalItems})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-cyan-500/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Không có vật phẩm nào trong giỏ</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.cartId}
                      className="flex gap-4 bg-[#1e293b]/50 border border-cyan-500/20 p-4 rounded-xl hover:bg-[#1e293b]/70 transition-all"
                    >
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border border-cyan-500/20"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-cyan-300 line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-400">{item.category}</p>
                        <p className="text-lg font-bold text-purple-400 mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all self-start"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-cyan-500/30 bg-[#0b1323]/90">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-slate-300">
                    Tổng cộng:
                  </span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      confirm("Xóa toàn bộ giỏ hàng?") && clearCart()
                    }
                    className="flex-1 border border-cyan-500/40 text-cyan-300 py-3 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all"
                  >
                    Xóa tất cả
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
                    Thanh toán
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main */}
      <main className="relative z-10 w-full px-8 md:px-16 py-16">
        <h2 className="text-5xl font-bold mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-[0.2em] uppercase">
          ✦ Sản phẩm Đa Vũ Trụ ✦
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-[#0f172a]/70 border border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>

                <div className="absolute bottom-4 left-0 w-full text-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  >
                    <ShoppingCart className="inline w-5 h-5 mr-2" />
                    Thêm vào giỏ
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2 h-10">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-slate-500">
                    ⭐ {product.rating}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2">
                  Kho:{" "}
                  <span
                    className={`font-semibold ${product.stock < 10 ? "text-red-400" : "text-green-400"
                      }`}
                  >
                    {product.stock} units
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
