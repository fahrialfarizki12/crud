import React from "react";
import { Outlet } from "react-router";
import Table from "./components/Table.jsx";
function App() {
  return (
    <>
      <Table />
      <Outlet />
    </>
  );
}
export default App;
