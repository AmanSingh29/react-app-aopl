const InputBox = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error = "",
}) => {
  const hasError = Boolean(error);

  return (
    <div className="mb-3">
      {label && (
        <label
          className="form-label fw-medium"
          style={{ fontSize: "14px", color: "#374151", marginBottom: "8px" }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
        style={{
          padding: "12px 16px",
          fontSize: "15px",
          borderRadius: "8px",
          border: hasError ? "2px solid #dc3545" : "2px solid #e2e8f0",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) => {
          if (hasError) {
            e.target.style.borderColor = "#dc3545";
            e.target.style.boxShadow = "0 0 0 3px rgba(220, 53, 69, 0.15)";
          } else {
            e.target.style.borderColor = "#667eea";
            e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
          }
        }}
        onBlur={(e) => {
          e.target.style.borderColor = hasError ? "#dc3545" : "#e2e8f0";
          e.target.style.boxShadow = "none";
        }}
        onMouseEnter={(e) => {
          if (document.activeElement !== e.target && !hasError) {
            e.target.style.borderColor = "#cbd5e0";
          }
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.target && !hasError) {
            e.target.style.borderColor = "#e2e8f0";
          }
        }}
      />

      {hasError && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default InputBox;
