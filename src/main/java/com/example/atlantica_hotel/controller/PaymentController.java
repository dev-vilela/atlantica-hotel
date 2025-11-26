package com.example.atlantica_hotel.controller;

import com.example.atlantica_hotel.model.Payment;
import com.example.atlantica_hotel.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/atlantica/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // ✅ Cria um pagamento vinculado a uma reserva
    @PostMapping("/{reservationId}")
    public Payment createPayment(@PathVariable Long reservationId, @RequestBody Payment payment) {
        return paymentService.createPayment(reservationId, payment);
    }

    // ✅ Retorna todos os pagamentos
    @GetMapping
    public List<Payment> listAllPayments() {
        return paymentService.listAllPayments();
    }

    // ✅ Retorna um pagamento pelo ID
    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    // ✅ Deleta um pagamento
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
    }
}
