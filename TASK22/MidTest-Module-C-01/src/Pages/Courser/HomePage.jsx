import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Giả sử dùng token trong localStorage để check login

  const fetchCourses = async (keyword = "", sort = "") => {
    try {
      let url = "/courses";
      if (keyword) {
        url += `?title_like=${keyword}`;
        if (sort) url += `&_sort=price&_order=${sort}`;
      } else if (sort) {
        url += `?_sort=price&_order=${sort}`;
      }
      const res = await api.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Không thể tải danh sách khóa học!");
    }
  };

  useEffect(() => {
    fetchCourses(search, sortOrder);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses(search, sortOrder);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchCourses(search, sortOrder);
  }, [sortOrder]);

  const onDelete = async (id) => {
    if (!window.confirm("Bạn có muốn xóa nội dung này không?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Xóa thành công!");
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Xóa không thành công!");
    }
  };

  const onLogout = async () => {
    if (!window.confirm("Bạn có muốn đăng xuất không?")) return;
    try {
      localStorage.removeItem("token"); // Xóa token
      setIsLoggedIn(false);
      toast.success("Đăng xuất thành công!");
      // Có thể redirect nếu cần: window.location.href = '/';
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất không thành công!");
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          padding: "50px",
          borderRadius: "20px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 0 40px rgba(0,255,255,0.3)",
          width: "90%",
          maxWidth: "1100px",
        }}
      >
        {/* Auth Buttons Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            paddingBottom: "10px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              style={{
                background: "linear-gradient(90deg, #ff007f, #ff00ff)",
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 0 10px rgba(255, 0, 127, 0.5)",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              🚪 Đăng Xuất
            </button>
          ) : (
            <>
              <Link
                to="/auth/register"
                style={{
                  background: "linear-gradient(90deg, #00ffff, #007bff)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                📝 Đăng Ký
              </Link>
              <Link
                to="/auth/login"
                style={{
                  background: "linear-gradient(90deg, #ff00ff, #ff007f)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 10px rgba(255, 0, 255, 0.5)",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                🔑 Đăng Nhập
              </Link>
            </>
          )}
        </div>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            background: "linear-gradient(90deg, #00ffff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "2.8rem",
            fontWeight: "bold",
            letterSpacing: "3px",
          }}
        >
          COURSES
        </h1>

        {/* 🔍 Ô tìm kiếm */}
        <div style={{ marginBottom: "25px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="🔎  Tìm khóa học theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px 20px",
              borderRadius: "50px",
              border: "2px solid #00ffff",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              width: "60%",
              outline: "none",
              fontSize: "1rem",
              textAlign: "center",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ff00ff")}
            onBlur={(e) => (e.target.style.borderColor = "#00ffff")}
          />
        </div>

        {/* ⚙️ Nút sắp xếp */}
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <button
            onClick={() => setSortOrder("asc")}
            style={{
              background:
                "linear-gradient(90deg, rgba(0,255,255,0.8), rgba(0,128,255,0.9))",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(0,255,255,0.6)",
              transition: "all 0.3s ease",
              fontWeight: "600",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            💎 Giá tăng dần ↑
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            style={{
              background:
                "linear-gradient(90deg, rgba(255,0,255,0.8), rgba(255,0,128,0.9))",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(255,0,255,0.6)",
              transition: "all 0.3s ease",
              fontWeight: "600",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            💰 Giá giảm dần ↓
          </button>
          <button
            onClick={() => setSortOrder("")}
            style={{
              background: "linear-gradient(90deg, #666, #999)",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(255,255,255,0.3)",
              transition: "all 0.3s ease",
              fontWeight: "600",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ❌ Hủy sắp xếp
          </button>
        </div>

        {/* 🧾 Bảng danh sách */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background: "rgba(0, 255, 255, 0.25)",
                color: "#00ffff",
                textTransform: "uppercase",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              <th style={{ padding: "10px" }}>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    textAlign: "center",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(0,255,255,0.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                >
                  <td style={{ padding: "10px" }}>{item.id}</td>
                  <td>
                    <Link
                      to={`/lessons/${item.id}`}
                      style={{
                        color: "#00ffff",
                        textDecoration: "none",
                        fontWeight: "500",
                      }}
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.description}</td>
                  <td style={{ fontWeight: "bold", color: "#ffccff" }}>
                    {item.price.toLocaleString()}₫
                  </td>
                  <td>
                    <button
                      onClick={() => onDelete(item.id)}
                      style={{
                        background: "transparent",
                        border: "1px solid #ff007f",
                        color: "#ff007f",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginRight: "8px",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(90deg,#ff007f,#ff00ff)";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#ff007f";
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to="/courses/add"
                      style={{
                        background: "linear-gradient(90deg, #00ffff, #007bff)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        marginRight: "8px",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 0 10px rgba(0,255,255,0.8)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      Add
                    </Link>
                    <Link
                      to={`/courses/edit/${item.id}`}
                      style={{
                        background: "linear-gradient(90deg, #ff00ff, #ff007f)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                          "0 0 10px rgba(255,0,255,0.8)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.boxShadow = "none")
                      }
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "25px",
                    color: "#ff007f",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  Không tìm thấy khóa học nào phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default HomePage;
