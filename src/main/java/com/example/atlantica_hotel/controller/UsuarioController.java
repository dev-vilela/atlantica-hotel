package com.example.atlantica_hotel.controller;

import com.example.atlantica_hotel.Exceptions.EmailExistsException;
import com.example.atlantica_hotel.model.Usuario;
import com.example.atlantica_hotel.service.ServiceUsuario;
import com.example.atlantica_hotel.Exceptions.ServiceExc;
import com.example.atlantica_hotel.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000") // permite que o React (Vite) acesse o backend
@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private ServiceUsuario serviceUsuario;

    @PostMapping("/login")
    public Object login(@RequestBody Usuario usuario) throws ServiceExc {
        try {
            String senhaCript = Util.md5(usuario.getSenha());
            Usuario userLogin = serviceUsuario.loginUser(usuario.getEmail(), senhaCript);

            if (userLogin != null) {
                return userLogin; // retorna o objeto do usuário (em JSON)
            } else {
                return new ErrorResponse("Usuário não encontrado ou senha incorreta!");
            }
        } catch (Exception e) {
            return new ErrorResponse("Erro ao efetuar login: " + e.getMessage());
        }
    }
    @PostMapping("/cadastro")
    public Object cadastrar(@RequestBody Usuario usuario) {
        try {
            serviceUsuario.salvarUsuario(usuario);
            return new SuccessResponse("Usuário cadastrado com sucesso!");
        } catch (EmailExistsException e) {
            return new ErrorResponse("E-mail já cadastrado!");
        } catch (Exception e) {
            return new ErrorResponse("Erro ao cadastrar: " + e.getMessage());
        }
    }

    // Classes auxiliares para retorno
    public record SuccessResponse(String message) {}
    public record ErrorResponse(String message) {}

}
