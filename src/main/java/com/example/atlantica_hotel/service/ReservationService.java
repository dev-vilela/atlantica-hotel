package com.example.atlantica_hotel.service;

import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.model.Room;
import com.example.atlantica_hotel.repository.ReservationRepository;
import com.example.atlantica_hotel.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    public ReservationService(ReservationRepository r, RoomRepository roomRepository) {
        this.reservationRepository = r;
        this.roomRepository = roomRepository;
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {
        // Pega o ID do quarto da requisição
        Long roomId = reservation.getRoom().getId();

        // Busca o quarto no banco de dados
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Quarto com ID " + roomId + " não encontrado."));

        // Associa o objeto Room completo à reserva
        reservation.setRoom(room);

        // Busca conflitos no mesmo quarto no mesmo intervalo
        List<Reservation> conflicts = reservationRepository
                .findByRoomIdAndCheckInLessThanEqualAndCheckOutGreaterThanEqual(
                        roomId, reservation.getCheckOut(), reservation.getCheckIn()
                );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Quarto não disponível para as datas selecionadas.");
        }

        reservation.setStatus("PENDING"); // Default
        return reservationRepository.save(reservation);
    }
}