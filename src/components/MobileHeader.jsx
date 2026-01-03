import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MobileHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div 
      className="d-md-none w-100 p-3 bg-dark text-white"
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2 bg-secondary"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h6 className="mb-0 fw-bold" style={{ fontSize: "14px" }}>
              {user?.username || "User"}
            </h6>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-outline-light btn-sm"
          style={{
            fontSize: "13px",
            padding: "6px 12px"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;

