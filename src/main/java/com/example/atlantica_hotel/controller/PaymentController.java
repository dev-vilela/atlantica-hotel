//package com.example.atlantica_hotel.controller;
//
//import com.example.atlantica_hotel.model.Payment;
//import com.example.atlantica_hotel.service.PaymentService;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/atlantica/payments")
//public class PaymentController {
//
//    private final PaymentService paymentService;
//
//    public PaymentController(PaymentService paymentService){
//        this.paymentService = paymentService;
//    }
//
//    @PostMapping("/{reservationId}")
//    public Payment createPayment(@PathVariable Long reservationId, @RequestBody Payment payment){
//        return paymentService.createPayment(reservationId, payment);
//    }
//
////    public  Payment getPayment(@PathVariable Long id){
////        return pay
////    }
//
//
//
//}
