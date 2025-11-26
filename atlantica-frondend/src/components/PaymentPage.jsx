import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch("http://localhost:8080/atlantica/rooms");
        if (!res.ok) throw new Error("Erro ao carregar quartos");
        const data = await res.json();
        const found = data.find((r) => String(r.id) === String(roomId));
        setRoom(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRoom();
  }, [roomId]);

  if (loading) return <p className="loading">Carregando quarto...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!room) return <p className="error">Quarto não encontrado.</p>;

  const handlePay = () => {
    alert("💳 Pagamento realizado com sucesso!");
    navigate("/");
  };

  return (
    <section className="payment-section">
      <div className="payment-container">
        <h2 className="payment-title">Confirmação da Reserva</h2>
        <p className="payment-subtitle">
          Confira os detalhes do seu quarto antes de efetuar o pagamento.
        </p>

        <div className="room-card-detalhe">

          
          <div className="room-image">
            <img
              src={room.photoUrl || room.photo || room.image || room.description}
          
            />
          </div>

          <div className="room-body">
            <div className="room-top">
              <h3>{room.name}</h3>
              <div className="price">R$ {room.pricePerNight} / noite</div>
            </div>

            <p className="room-desc">{room.description}</p>

            <div className="room-bottom">
              <div className="muted small">Capacidade: {room.maxGuests} hóspedes</div>

              <div className="payment-buttons">
                <button className="btn btn-cta" onClick={handlePay}>
                  💳 Pagar Agora
                </button>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                  ⬅ Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
