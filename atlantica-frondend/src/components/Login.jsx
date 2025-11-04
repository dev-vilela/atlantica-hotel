import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Simulação de login (aqui você pode conectar ao backend futuramente)
    if (form.email === "admin@hotel.com" && form.password === "1234") {
      navigate("/"); // redireciona para home
    } else {
      alert("Credenciais inválidas!");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Bem-vindo ao Atlântica Hotel</h2>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Senha</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Entrar</button>

          <div className="login-footer">
            <p>
              Não tem conta?{" "}
              <span onClick={() => navigate("/cadastro")}>Cadastre-se</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
