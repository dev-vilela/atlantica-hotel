import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AtlanticaHotelLayout.css"; 

export default function PaymentPage() {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    // buscar dados da reserva
    fetch(`http://localhost:8080/atlantica/reservations/${reservationId}`)
      .then(res => res.json())
      .then(data => {
        setReservation(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [reservationId]);

  const handlePayment = async () => {
    try {
      await fetch(
        `http://localhost:8080/atlantica/reservations/${reservationId}/status?status=CONFIRMED`,
        { method: "PUT" }
      );
      setPaid(true);
    } catch (err) {
      alert("Erro ao processar pagamento.");
    }
  };

  if (loading) return <p className="text-center mt-10">Carregando reserva...</p>;
  if (!reservation) return <p className="text-center mt-10">Reserva não encontrada</p>;

  return (
    <div className="atl-payment-page">
      <div className="atl-container payment-card">
        <h2 className="payment-title">Pagamento da Reserva</h2>

        <div className="payment-details">
          <div className="detail-item">
            <span className="detail-label">Nome:</span>
            <span className="detail-value">{reservation.nameClient}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{reservation.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Check-in:</span>
            <span className="detail-value">{reservation.checkIn}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Check-out:</span>
            <span className="detail-value">{reservation.checkOut}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className={`detail-value ${paid ? "paid" : ""}`}>
              {paid ? "CONFIRMADO ✅" : reservation.status}
            </span>
          </div>
        </div>

        {!paid ? (
          <button onClick={handlePayment} className="btn btn-primary mt-6 w-full">
            Pagar Agora
          </button>
        ) : (
          <p className="payment-success">
            Pagamento realizado com sucesso! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
