import React from "react";
import Table from "../components/Table";
import { dummyUsers } from "../data/dummyData";

const HomeScreen = () => {
  const tableColumns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Email",
      accessor: "email",
    },
  ];

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="container-fluid">
        <h1
          className="mb-4 fw-bold"
          style={{ fontSize: "28px", color: "#1a202c" }}
        >
          Welcome!
        </h1>
        <Table data={dummyUsers} columns={tableColumns} title="Users List" />
      </div>
    </div>
  );
};

export default HomeScreen;
