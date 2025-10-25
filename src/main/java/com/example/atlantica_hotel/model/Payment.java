//package com.example.atlantica_hotel.model;
//
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.ManyToOne;
//
//import java.time.LocalDateTime;
//
//public class Payment {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String method;
//    private Double amount;
//    private String status;
//    private LocalDateTime paymentDate;
//
//    @ManyToOne
//    private Reservation reservation;
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getMethod() {
//        return method;
//    }
//
//    public void setMethod(String method) {
//        this.method = method;
//    }
//
//    public Double getAmount() {
//        return amount;
//    }
//
//    public void setAmount(Double amount) {
//        this.amount = amount;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public LocalDateTime getPaymentDate() {
//        return paymentDate;
//    }
//
//    public void setPaymentDate(LocalDateTime paymentDate) {
//        this.paymentDate = paymentDate;
//    }
//
//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }
//}
