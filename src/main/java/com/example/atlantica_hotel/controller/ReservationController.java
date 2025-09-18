package com.example.atlantica_hotel.controller;

import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.model.Room;
import com.example.atlantica_hotel.repository.RoomRepository;
import com.example.atlantica_hotel.service.ReservationService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/movies")
public class ReservationController {

    private final RoomRepository roomRepository;
    private  final ReservationService reservationService;

    public ReservationController(RoomRepository roomRepository, ReservationService reservationService){
        this.roomRepository = roomRepository;
        this.reservationService = reservationService;
    }

    @GetMapping("/rooms")
    public List<Room> listRooms(){
        return  roomRepository.findAll();
    }

    @PostMapping("/reservations")
    public Reservation create(@RequestBody Reservation reservation){
        return reservationService.createReservation(reservation);
    }
}
