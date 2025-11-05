package com.example.atlantica_hotel.util;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Util {
    //Método que retorna o hash MD5 de uma string (normalmente usado para "criptografar" senhas)
    public static String md5(String senha) throws NoSuchAlgorithmException {

        // Cria uma instância do algoritmo de hash MD5
        MessageDigest messagedig = MessageDigest.getInstance("md5");

        // Gera o hash da senha e converte para um número inteiro positivo (BigInteger)
        BigInteger hash = new BigInteger(1, messagedig.digest(senha.getBytes()));

        // Retorna o hash em formato hexadecimal (base 16)
        return hash.toString(16);
    }
}
