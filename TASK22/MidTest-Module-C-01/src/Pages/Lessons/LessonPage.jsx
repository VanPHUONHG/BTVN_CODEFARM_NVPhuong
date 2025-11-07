import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Api";

const LessonPage = () => {
  const [products, setProducts] = useState([]);
  const { courseId } = useParams();
  console.log(courseId);

  useEffect(() => {
    // Sử dụng api thay vì axios trực tiếp để nhất quán (giả sử api có baseURL là http://localhost:3000)
    api
      .get(`/lessons?courseId=${courseId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Lỗi fetch lessons:", error);
        toast.error("Không thể tải danh sách bài học!");
      });
  }, [courseId]); // Thêm courseId vào dependency để refetch nếu thay đổi

  const onDelete = async (id) => {
    if (!window.confirm("Bạn có muốn xóa nội dung này không?")) return;
    try {
      await api.delete(`/lessons/${id}`); // Sửa: delete lessons thay vì courses
      toast.success("Xóa thành công!");
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Xóa không thành công!");
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
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          color: "white",
          width: "100%",
          maxWidth: "1200px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              background:
                "linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "1px",
              textShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
              animation: "glow 2s ease-in-out infinite alternate",
            }}
          >
            Lessons Collection
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: 0.8,
              marginTop: "10px",
              color: "#e0e0e0",
            }}
          >
            Khám phá và quản lý các bài học của bạn (Khóa học ID: {courseId})
          </p>
          {/* Add Button in Header */}
          <Link
            to={`/courses/${courseId}/add`} // Sửa route để quay về add lesson cho course cụ thể, hoặc dùng "/lessons/add" nếu route khác
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #00ffff 0%, #007bff 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "600",
              marginTop: "20px",
              boxShadow: "0 8px 20px rgba(0, 255, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 25px rgba(0, 255, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(0, 255, 255, 0.3)";
            }}
          >
            ➕ Thêm Bài Học Mới
          </Link>
          {/* Back to Courses */}
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #ff00ff 0%, #ff007f 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: "600",
              marginTop: "20px",
              marginLeft: "10px",
              boxShadow: "0 8px 20px rgba(255, 0, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 25px rgba(255, 0, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 20px rgba(255, 0, 255, 0.3)";
            }}
          >
            ← Quay Về Courses
          </Link>
        </div>

        {/* Lessons Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px",
            marginBottom: "20px",
          }}
        >
          {products.map((item) => (
            <div
              key={item.id}
              style={{
                background:
                  "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.3))",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow:
                  "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 255, 255, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    background: "linear-gradient(135deg, #00ffff, #ff00ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {item.title}
                </h3>
                <span
                  style={{
                    background: "rgba(0, 255, 255, 0.2)",
                    color: "#00ffff",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  ID: {item.id}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  marginBottom: "20px",
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  color: "#e0e0e0",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.content}
              </div>

              {/* Course ID Badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    background: "rgba(255, 0, 255, 0.2)",
                    color: "#ff00ff",
                    padding: "6px 12px",
                    borderRadius: "15px",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                  }}
                >
                  Course ID: {item.courseId}
                </span>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    background:
                      "linear-gradient(135deg, #ff007f 0%, #ff00ff 100%)",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(255, 0, 127, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 16px rgba(255, 0, 127, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(255, 0, 127, 0.3)";
                  }}
                >
                  🗑️ Xóa
                </button>
                <Link
                  to={`/courses/${courseId}/lessons/edit/${item.id}`} // Sửa route edit lesson cụ thể
                  style={{
                    background:
                      "linear-gradient(135deg, #00ffff 0%, #007bff 100%)",
                    color: "white",
                    textDecoration: "none",
                    padding: "10px 16px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0, 255, 255, 0.3)",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 16px rgba(0, 255, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(0, 255, 255, 0.3)";
                  }}
                >
                  ✏️ Sửa
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#b0b0b0",
            }}
          >
            <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
              Chưa có bài học nào
            </h2>
            <p>Bắt đầu bằng cách thêm bài học đầu tiên của bạn!</p>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          fontFamily: "'Poppins', sans-serif",
        }}
      />

      {/* Custom CSS for Glow Animation */}
      <style>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
              0 0 30px rgba(0, 255, 255, 0.3);
          }
          to {
            text-shadow: 0 0 30px rgba(0, 255, 255, 0.8),
              0 0 40px rgba(0, 255, 255, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default LessonPage;
