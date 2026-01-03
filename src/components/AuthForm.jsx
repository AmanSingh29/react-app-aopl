import React from "react";
import InputBox from "./InputBox";

const AuthForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  formMode,
  changeFormMode,
  loading = false,
  error = "",
}) => {
  const isSignup = formMode === "signup";

  const title = isSignup ? "Sign Up" : "Log In";
  const subtitle = isSignup
    ? "Create your account to get started"
    : "Welcome back! Please log in to continue";

  const inputFields = [
    {
      name: "UserName",
      placeholder: "Username",
      show: true,
    },
    {
      name: "Email",
      type: "email",
      placeholder: "Email",
      show: isSignup,
    },
    {
      name: "Password",
      type: "password",
      placeholder: "Password",
      show: true,
    },
    {
      name: "MobileNo",
      placeholder: "Mobile Number",
      show: isSignup,
    },
    {
      name: "Address",
      placeholder: "Address",
      show: isSignup,
    },
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card shadow-lg border-0 rounded-4 w-100"
        style={{ maxWidth: "440px" }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h1 className="fw-bold mb-2 fs-2 text-dark">{title}</h1>
            <p className="text-muted small mb-0">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {inputFields
              .filter((field) => field.show)
              .map(({ name, type = "text", placeholder }) => (
                <InputBox
                  key={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleInputChange}
                />
              ))}

            {error && (
              <div className="alert alert-danger mt-3 small" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 fw-semibold py-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  {isSignup ? "Signing up..." : "Logging in..."}
                </>
              ) : (
                title
              )}
            </button>

            <div className="d-flex justify-content-center align-items-center gap-2 mt-4 pt-4 border-top">
              <span className="text-muted small">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={changeFormMode}
                className="btn btn-link p-0 fw-semibold text-primary text-decoration-none small"
              >
                {isSignup ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
