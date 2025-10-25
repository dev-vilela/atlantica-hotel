//package com.example.atlantica_hotel.service;
//
//import com.example.atlantica_hotel.model.Payment;
//import com.example.atlantica_hotel.model.Reservation;
//import com.example.atlantica_hotel.repository.PaymentRepository;
//import com.example.atlantica_hotel.repository.ReservationRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PaymentService {
//
//    private final PaymentRepository paymentRepository;
//    private final ReservationRepository reservationRepository;
//
//    public PaymentService(PaymentRepository paymentRepository, ReservationRepository reservationRepository){
//        this.paymentRepository = paymentRepository;
//        this.reservationRepository = reservationRepository;
//    }
//
//    public Payment createPayment(Long reservationId, Payment payment){
//        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
//
//        if(optionalReservation.isEmpty()){
//            throw new RuntimeException("Reserva não encontrada com ID: " + reservationId);
//        }
//
//        Reservation reservation = optionalReservation.get();
//        payment.setReservation(reservation);
//
//        payment.setPaymentDate(LocalDateTime.now());
//
//        payment.setStatus("PAID");
//
//        return  paymentRepository.save(payment);
//    }
//
//    public List<Payment> listAllPayments(){
//        return paymentRepository.findAll();
//    }
//
//    public Optional<Payment> getPaymentById(Long id){
//        return paymentRepository.findById(id);
//    }
//
//    public void deletePayment(Long id){
//        paymentRepository.deleteById(id);
//    }
//
//}
