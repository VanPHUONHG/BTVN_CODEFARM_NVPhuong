import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate cho logout
import { toast } from "react-toastify";
import api from "../../Api"; // Cho delete
import { projectsApi } from "../../Api/ProjectsApi";

const HomeProjects = () => {
  const navigate = useNavigate(); // Cho logout
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ status: "", q: "" });
  const [inputValue, setInputValue] = useState(""); // State riêng cho input typing (mượt)
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null); // Timeout ref

  // Check if logged in (từ localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle logout
  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Đăng xuất thành công!");
      navigate("/auth/login", { replace: true }); // Chuyển sang trang login
    }
  };

  // Handle status change (không debounce)
  const handleStatusChange = useCallback((e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  }, []);

  // Handle search input: Update input ngay (mượt), debounce setFilters
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value); // Update input ngay để typing mượt

      // Clear timeout cũ
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      // Set timeout mới: Sau 500ms ngừng gõ → update filters.q và fetch
      const timeout = setTimeout(() => {
        setFilters((prev) => ({ ...prev, q: value })); // Chỉ lúc này mới update q
      }, 500);

      setDebounceTimeout(timeout);
    },
    [debounceTimeout]
  );

  // Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  // Fetch khi filters thay đổi (status hoặc q)
  useEffect(() => {
    setLoading(true);
    projectsApi(filters)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch projects:", err);
        toast.error("Lỗi tải danh sách projects!");
        setLoading(false);
      });
  }, [filters.status, filters.q]);

  const clearFilters = useCallback(() => {
    setFilters({ status: "", q: "" });
    setInputValue(""); // Clear input
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  }, [debounceTimeout]);

  const onDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa project này không?")) {
      try {
        await api.delete(`/projects/${id}`);
        toast.success("Xóa project thành công!");
        setProjects(projects.filter((p) => p.id !== id));
      } catch (error) {
        console.error(error);
        toast.error("Xóa project không thành công!");
      }
    }
  };

  if (loading && !projects.length)
    return <div className="text-center p-4">Đang tải...</div>; // Chỉ show loading nếu chưa có data

  return (
    <div>
      {/* Header với nút Login/Logout */}
      <header className="bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
        <h1>Danh sách Projects</h1>
        <nav>
          {isLoggedIn ? (
            // Nếu đã login: Show nút Logout
            <button onClick={handleLogout} className="btn btn-outline-danger">
              Đăng xuất
            </button>
          ) : (
            // Nếu chưa login: Show nút Login
            <Link to="/auth/login" className="btn btn-primary me-2">
              Đăng nhập
            </Link>
          )}
        </nav>
      </header>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Lọc theo Status:</label>
          <select
            className="form-select"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value="">Tất cả</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-md-6 position-relative">
          <label className="form-label">Tìm kiếm theo tên:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập keyword... (tìm theo title)"
            value={inputValue}
            onChange={handleSearchChange}
          />
          {/* Spinner chỉ khi đang fetch do search */}
          {loading && inputValue && (
            <div className="position-absolute top-50 end-0 translate-middle-y me-3">
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              >
                <span className="visually-hidden">Đang tìm...</span>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-secondary me-2" onClick={clearFilters}>
            Huỷ lọc
          </button>
        </div>
      </div>

      <Link to="add" className="btn btn-primary mb-3">
        Thêm Project mới
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                {inputValue
                  ? `Không tìm thấy projects với "${inputValue}"...`
                  : "Không có projects phù hợp với filter..."}
              </td>
            </tr>
          ) : (
            projects.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>
                  <Link
                    to={`tasks/${item.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Xem Tasks
                  </Link>
                  <Link
                    to={`edit/${item.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeProjects;
