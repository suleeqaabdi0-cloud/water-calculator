import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import History from "./pages/History";
import Usage from "./pages/Usage";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="history" element={<History />} />
        <Route path="usage" element={<Usage />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}