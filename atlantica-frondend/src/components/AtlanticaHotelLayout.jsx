import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AtlanticaHotelLayout.css";
import heroImg from './img/SALINAS-GERAL-TRAS001.jpg';

export default function AtlanticaHotelLayout() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("http://localhost:8080/atlantica/rooms");
        if (!res.ok) throw new Error("Erro ao carregar quartos");
        const data = await res.json();
        setRooms(data);
        if (data.length > 0) {
          setForm((s) => ({ ...s, roomId: data[0].id }));
        }
      } catch (err) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.checkIn || !form.checkOut) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const payload = {
        nameClient: form.fullName,
        email: form.email,
        phone: form.phone,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        room: { id: form.roomId },
      };

      const res = await fetch("http://localhost:8080/atlantica/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao criar reserva");

      const created = await res.json();

      // 🔥 Redireciona direto para a página de pagamento
      navigate(`/payment/${created.id}`);
    } catch (err) {
      alert(err.message || "Erro ao enviar reserva.");
    }
  }

  function handleReserveClick() {
    navigate("/login");
  }

  const imageFor = (r) => r.photoUrl || r.photo || r.image || "https://via.placeholder.com/800x500?text=Hotel+Image";


  return (
    <div className="atl-layout">
      {/* NAVBAR */}
      <header className="atl-header">
        <div className="atl-container atl-header-inner">
          <div className="atl-brand">
            <div className="atl-logo">AH</div>
            <div className="atl-brand-text">
              <h1>Atlântica Hotel</h1>
              <p className="atl-sub">Conforto &amp; elegância à beira-mar</p>
            </div>
          </div>

          <nav className="atl-nav">
            <a href="#rooms">Quartos</a>
            <a href="#booking">Reserva</a>
            <a href="#contact">Contato</a>
            <button className="btn btn-cta" onClick={handleReserveClick} >Reserve agora</button>
          </nav>

          <div className="atl-mobile-book">
            <button className="btn btn-cta-small">Book</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="atl-hero">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/assets/videos/bg-02.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos em HTML5.
        </video>

        <div className="overlay"></div> {/* sombra suave */}

        <div className="atl-container atl-hero-inner">
          <div className="atl-hero-left">
            <h2>Descubra a elegância à beira-mar</h2>
            <p className="hero-sub">
              Relaxe em quartos projetados para oferecer conforto, momentos inesquecíveis e serviço personalizado para você.
            </p>

            <div className="hero-actions">
              <a href="#booking" className="btn btn-cta" onClick={handleReserveClick}>Reserve agora</a>
              <a href="#rooms" className="btn btn-outline">Ver Quartos</a>
            </div>

            <div className="hero-note">
              <strong>Especial:</strong> Café da manhã gratuito para estadias acima de 3 noites. Cancelamento flexível.
            </div>
          </div>  

          <div className="atl-hero-right">
            <div className="hero-image-wrap">
              <img src={heroImg} alt="Hotel" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN: Rooms + Booking form */}
      <main className="atl-container atl-main">
        <section id="rooms" className="rooms-section">
          <div className="section-head">
            <h3>Quartos &amp; Preços</h3>
            <div className="muted">Melhores tarifas garantidas</div>
          </div>

          {loading && <p className="mt-6">Loading rooms...</p>}
          {error && <p className="mt-6 error-text">{error}</p>}

          <div className="rooms-grid">
            {rooms.map((r) => (
              <article key={r.id} className="room-card">
                <div className="room-image">
                  <img src={imageFor(r)} alt={r.name} />
                </div>
                <div className="room-body">
                  <div className="room-top">
                    <h4>{r.name}</h4>
                    <div className="price">R$ {r.pricePerNight}</div>
                  </div>
                  <p className="room-desc">{r.description}</p>
                  <div className="room-bottom">
                    <div className="muted small">Até {r.maxGuests} hóspedes</div>
                    {/* <button onClick={() => setForm((s) => ({ ...s, roomId: r.id }))} className="btn btn-select">Selecione</button> */}
                    <button onClick={handleReserveClick} className="btn btn-select">Rerseve</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside id="booking" className="booking-aside">
 
          <div className="atl-container">
          <h2>Fale Conosco</h2>
          <p>
            Tem dúvidas sobre reservas, tarifas ou eventos? Nossa equipe está
            pronta para ajudar.
          </p>

          <form className="booking-form">
            <input type="text" placeholder="Seu nome" required />
            <input type="email" placeholder="Seu e-mail" required />
            <textarea placeholder="Mensagem"></textarea>
            <button  className="btn btn-submit" type="submit">
              Enviar mensagem
            </button>
          </form>
        </div>

        </aside>

        {/* <aside id="booking" className="booking-aside">
          <h3>Reserve um quarto</h3>
          <p className="muted small">Preencha o formulário e confirmaremos a disponibilidade.</p>

          <form onSubmit={handleSubmit} className="booking-form">
            <label>Nome Completo *</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} />

            <label>Email *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />

            <label>Telefone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />

            <label>Quarto</label>
            <select name="roomId" value={form.roomId} onChange={handleChange}>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>{r.name} — R$ {r.pricePerNight}</option>
              ))}
            </select>

            <div className="date-grid">
              <div>
                <label>Check-in *</label>
                <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} />
              </div>
              <div>
                <label>Check-out *</label>
                <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} />
              </div>
            </div>

            <label>Hóspedes</label>
            <input name="guests" type="number" min="1" max="10" value={form.guests} onChange={handleChange} />

            <button type="submit" className="btn btn-submit">Solicitar reserva</button>
          </form>
        </aside> */}
      </main>

      {/* FOOTER */}
      <footer id="contact" className="atl-footer">
        <div className="atl-container footer-grid">
          <div>
            <h4>Atlântica Hotel</h4>
            <p className="muted">Rua Exemplo, 123 — Beachfront, Fortaleza</p>
            <p className="muted">+55 61 9XXXX-XXXX</p>
          </div>

          <div>
            <h4>Comodidades</h4>
            <ul className="muted">
              <li>Café da manhã grátis</li>
              <li>Wi-Fi</li>
              <li>Piscina &amp; Spa</li>
            </ul>
          </div>

          <div>
            <h4>Inscrever-se</h4>
            <p className="muted">Aproveite ótimas ofertas e promoções.</p>
            <div className="subscribe">
              <input placeholder="your@email.com" />
              <button className="btn btn-small">Enviar</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Atlântica Hotel — Todos os direitos reservados - by{" "}
          <a href="https://github.com/dev-vilela" target="_blank" rel="noopener noreferrer">Paulo Vilela</a>
        </div>
      </footer>
    </div>
  );
}
