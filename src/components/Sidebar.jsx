import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div 
      className="d-none d-md-flex flex-column h-100 p-3 p-md-4 bg-dark text-white"
      style={{
        width: "280px",
        minHeight: "100vh",
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* User Section */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3 bg-secondary"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              fontWeight: "bold"
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h5 className="mb-0 fw-bold" style={{ fontSize: "16px" }}>
              {user?.username || "User"}
            </h5>
            {user?.email && (
              <small className="text-secondary" style={{ fontSize: "12px" }}>
                {user.email}
              </small>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-grow-1">
        {/* Add more menu items here if needed */}
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center"
          style={{
            padding: "12px",
            fontSize: "15px",
            fontWeight: "500"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-box-arrow-right me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
            />
            <path
              fillRule="evenodd"
              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

