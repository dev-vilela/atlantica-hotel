import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AtlanticaHotelLayout from "./components/AtlanticaHotelLayout";
import PaymentPage from "./components/PaymentPage";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtlanticaHotelLayout />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
