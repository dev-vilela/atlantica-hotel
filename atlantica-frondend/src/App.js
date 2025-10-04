import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AtlanticaHotelLayout from "./components/AtlanticaHotelLayout";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtlanticaHotelLayout />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
