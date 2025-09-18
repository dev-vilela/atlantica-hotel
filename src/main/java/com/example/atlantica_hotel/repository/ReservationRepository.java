package com.example.atlantica_hotel.repository;

import com.example.atlantica_hotel.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Busca reservas que colidem com as datas (para evitar overbooking)
    List<Reservation>findByRoomIdAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(
            Long roomId, LocalDate checkOut, LocalDate checkIn
    );
}
