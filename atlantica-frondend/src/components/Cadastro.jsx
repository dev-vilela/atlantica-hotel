import React, { useState } from "react";
import "./Cadastro.css"; // arquivo de estilos separado

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Cadastro realizado com sucesso!");
    console.log(formData);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-left">
          {/* Você pode colocar uma imagem aqui se quiser */}
        </div>

        <div className="cadastro-right">
          <h1 className="cadastro-title">Cadastrar</h1>

          <form onSubmit={handleSubmit} className="cadastro-form">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="sobrenome"
                  placeholder="Sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="row">
              <div className="col">
                <input
                  type="password"
                  name="senha"
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  name="confirmarSenha"
                  placeholder="Confirme a Senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>

          <div className="cadastro-footer">
            <a href="/login">Já tem uma conta? Faça login!</a>
          </div>
        </div>
      </div>
    </div>
  );
}
