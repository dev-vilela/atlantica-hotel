package com.example.atlantica_hotel.service;

import com.example.atlantica_hotel.Exceptions.CriptoExistException;
import com.example.atlantica_hotel.Exceptions.EmailExistsException;
import com.example.atlantica_hotel.Exceptions.ServiceExc;
import com.example.atlantica_hotel.model.Usuario;
import com.example.atlantica_hotel.repository.UsuarioDao;

import com.example.atlantica_hotel.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public class ServiceUsuario {

    @Autowired
    private UsuarioDao repositorioUsuario;

    //Método para salvar um novo usuário no banco
    public void salvarUsuario(Usuario user) throws Exception{

        try {

            //Verifica se já existe um usuário com o mesmo email
            if (repositorioUsuario.findByEmail(user.getEmail()) != null){
                throw  new EmailExistsException("Já possui um email cadastrado para: " + user.getEmail());
            }

            //Se não existir, criptografa a senna com MD5 antes de salvar
            user.setSenha(Util.md5(user.getSenha()));

        } catch (NoSuchAlgorithmException e) {
            // Caso ocorra erro na criptografia, lança exceção personalizada
            throw new CriptoExistException("Erro na criptografia da senha");
        }

        repositorioUsuario.save(user);
    }
    public Usuario loginUser(String email, String senha) throws ServiceExc {

//        System.out.println("==> LOGIN TENTATIVA:");
//        System.out.println("Usuário: " + user);
//        System.out.println("Senha MD5: " + senha);

        Usuario userLogin = repositorioUsuario.buscarLogin(email, senha);

        if (userLogin == null) {
            System.out.println("⚠️ Nenhum usuário encontrado com essas credenciais!");
        } else {
            System.out.println("✅ Usuário encontrado: " + userLogin.getEmail());
        }

        return userLogin;
    }

}
