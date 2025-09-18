package com.example.atlantica_hotel.repository;

import com.example.atlantica_hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
