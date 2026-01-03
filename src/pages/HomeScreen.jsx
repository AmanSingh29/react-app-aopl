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
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <Table data={dummyUsers} columns={tableColumns} title="Data List" />
    </div>
  );
};

export default HomeScreen;
