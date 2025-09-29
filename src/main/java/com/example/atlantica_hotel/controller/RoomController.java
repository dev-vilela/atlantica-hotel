package com.example.atlantica_hotel.controller;

import com.example.atlantica_hotel.model.Reservation;
import com.example.atlantica_hotel.model.Room;
import com.example.atlantica_hotel.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/atlantica/rooms")
public class RoomController {

    //OPÇÔES DE QUARTOS
    private  final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    @GetMapping
    public List<Room> listRooms(){

        return  roomRepository.findAll();
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {

        return roomRepository.save(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room updatedRoom) {
        // 1. Tenta encontrar o quarto no banco de dados pelo ID
        Optional<Room> existingRoom = roomRepository.findById(id);

        if (existingRoom.isPresent()) {
            Room room = existingRoom.get();

            // 2. Atualiza todos os campos do objeto existente com os novos dados
            // Note que não atualizamos o ID, garantindo que seja um UPDATE e não INSERT
            room.setName(updatedRoom.getName());
            room.setDescription(updatedRoom.getDescription());
            room.setPricePerNight(updatedRoom.getPricePerNight());
            room.setPhotoUrl(updatedRoom.getPhotoUrl());
            room.setMaxGuests(updatedRoom.getMaxGuests());

            // 3. Salva a entidade atualizada (UPDATE)
            Room savedRoom = roomRepository.save(room);

            // 4. Retorna a resposta HTTP 200 OK com o objeto salvo
            return ResponseEntity.ok(savedRoom);
        } else {
            // Se o ID não for encontrado, retorna HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }}

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {

        roomRepository.deleteById(id);
    }

}
