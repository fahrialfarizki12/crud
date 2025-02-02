import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import HOME from "./HOME.jsx";
import About from "./about.jsx";
import Edit from "./layouts/Edit.jsx";
import Table from "./components/Table.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/edit/:id" element={<Edit />}></Route>
    </Routes>
  </BrowserRouter>
);
