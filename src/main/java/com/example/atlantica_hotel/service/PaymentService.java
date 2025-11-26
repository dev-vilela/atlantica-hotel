package com.example.atlantica_hotel.service;

import com.example.atlantica_hotel.model.Payment;
import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.repository.PaymentRepository;
import com.example.atlantica_hotel.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationRepository reservationRepository;

    public PaymentService(PaymentRepository paymentRepository, ReservationRepository reservationRepository){
        this.paymentRepository = paymentRepository;
        this.reservationRepository = reservationRepository;
    }

    // ✅ Cria um pagamento vinculado à reserva
    public Payment createPayment(Long reservationId, Payment payment){
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reserva não encontrada com ID: " + reservationId));

        payment.setReservation(reservation);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("PAID");

        return paymentRepository.save(payment);
    }

    // ✅ Lista todos os pagamentos
    public List<Payment> listAllPayments(){
        return paymentRepository.findAll();
    }

    // ✅ Busca um pagamento pelo ID
    public Payment getPaymentById(Long id){
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pagamento não encontrado com ID: " + id));
    }

    // ✅ Deleta um pagamento
    public void deletePayment(Long id){
        paymentRepository.deleteById(id);
    }
}
