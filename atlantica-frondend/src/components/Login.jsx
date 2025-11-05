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

  fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      senha: form.password, // igual ao nome da propriedade no backend
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok && !data.message) {
        alert("✅ Login realizado com sucesso!");
        console.log("Usuário logado:", data);
        navigate("/reserva"); // redireciona para a home
      } else {
        alert(data.message || "Credenciais inválidas!");
      }
    })
    .catch(() => {
      alert("Erro ao conectar ao servidor.");
    });
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

          <button type="submit" >Entrar</button>

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
