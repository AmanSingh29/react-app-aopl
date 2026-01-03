import React from "react";

const Table = ({ data, columns, title, className = "" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
        <div className="card-body text-center p-5">
          <p className="text-muted mb-0">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`card shadow-sm border-0 ${className}`} style={{ borderRadius: "12px" }}>
      {title && (
        <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
          <h5 className="mb-0 fw-bold" style={{ fontSize: "20px", color: "#1a202c" }}>
            {title}
          </h5>
        </div>
      )}
      <div className="card-body p-0">
        <div className="table-responsive" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table className="table table-hover mb-0" style={{ minWidth: "600px", width: "100%" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="text-nowrap fw-semibold px-2 px-md-3 px-lg-4 py-2 py-md-3"
                    style={{
                      fontSize: "13px",
                      color: "#495057",
                      borderBottom: "2px solid #dee2e6"
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-2 px-md-3 px-lg-4 py-2 py-md-3"
                      style={{
                        fontSize: "13px",
                        color: "#495057",
                        verticalAlign: "middle"
                      }}
                    >
                      {column.render
                        ? column.render(row[column.accessor], row)
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;

