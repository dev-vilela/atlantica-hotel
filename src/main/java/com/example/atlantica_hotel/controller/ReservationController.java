package com.example.atlantica_hotel.controller;

import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.service.ReservationService;
import com.example.atlantica_hotel.repository.ReservationRepository; // Import necessário
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/atlantica/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationRepository reservationRepository; // Adicione esta linha

    public ReservationController(ReservationService reservationService, ReservationRepository reservationRepository) {
        this.reservationService = reservationService;
        this.reservationRepository = reservationRepository;
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation){
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> listReservations() {
        return reservationRepository.findAll();
    }
}