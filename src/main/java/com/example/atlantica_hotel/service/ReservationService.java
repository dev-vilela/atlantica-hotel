package com.example.atlantica_hotel.service;

import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.repository.ReservationRepository;
import com.example.atlantica_hotel.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    public ReservationService(ReservationRepository r, RoomRepository roomRepository){
        this.reservationRepository = r;
        this.roomRepository = roomRepository;
    }

    @Transactional
    public Reservation createReservation(Reservation reservation){
        Long roomId = reservation.getRoom().getId();

        // Busca conflitos no mesmo quarto no mesmo intervalo
        List<Reservation> conflicts = reservationRepository
                .findByRoomIdAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(
                        roomId, reservation.getCheckOut(), reservation.getCheckIn()
                );

        if(!conflicts.isEmpty()){
            throw new RuntimeException("Room not available for selected dates");
        }

        reservation.setStatus("PENDING"); // Default
        return reservationRepository.save(reservation);
    }

}
