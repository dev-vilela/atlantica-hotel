import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Reserva.css";

export default function Reserva() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Agora vem antes

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId:  "", 
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("http://localhost:8080/atlantica/rooms");
        if (!res.ok) throw new Error("Erro ao carregar quartos");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação enviada com sucesso!");
    console.log(form);
  };

  const handlePaymentClick = (e) => {
    e.preventDefault();
    if (!form.roomId) {
      alert("Selecione um quarto antes de continuar para o pagamento!");
      return;
    }
    navigate(`/payment/${form.roomId}`);
  };

  return (
    <section className="reserva-section">
      <div className="reserva-container">
        <h2 className="reserva-title">Reserve seu quarto</h2>
        <p className="reserva-subtitle">
          Preencha os dados abaixo e entraremos em contato para confirmar sua
          estadia no <strong>Atlântica Hotel</strong>.
        </p>

        {loading ? (
          <p>Carregando quartos...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
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
              <label>Quartos</label>
              <select
                name="roomId"
                value={form.roomId}
                onChange={handleChange}
                required
              >
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

            <button
              type="submit"
              className="btn-reservar"
              onClick={handlePaymentClick}
            >
              Solicitar Reserva
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
