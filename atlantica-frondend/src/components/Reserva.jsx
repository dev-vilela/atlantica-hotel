import React, { useState } from "react";
import "./Reserva.css";

export default function Reserva() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const rooms = [
    { id: 1, name: "Suíte Luxo", pricePerNight: 890 },
    { id: 2, name: "Vista Mar Premium", pricePerNight: 1200 },
    { id: 3, name: "Executivo Standard", pricePerNight: 590 },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação enviada com sucesso!");
    console.log(form);
  };

  return (
    <section className="reserva-section">
      <div className="reserva-container">
        <h2 className="reserva-title">Reserve seu quarto</h2>
        <p className="reserva-subtitle">
          Preencha os dados abaixo e entraremos em contato para confirmar sua estadia no{" "}
          <strong>Atlântica Hotel</strong>.
        </p>

        <form onSubmit={handleSubmit} className="reserva-form">
          <div className="form-group">
            <label>Nome Completo *</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seuemail@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>

          <div className="form-group">
            <label>Quarto</label>
            <select name="roomId" value={form.roomId} onChange={handleChange} required>
              <option value="">Selecione uma opção</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — R$ {r.pricePerNight}/noite
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Check-in *</label>
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out *</label>
              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Hóspedes</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="10"
              value={form.guests}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-reservar">
            Solicitar Reserva
          </button>
        </form>
      </div>
    </section>
  );
}
