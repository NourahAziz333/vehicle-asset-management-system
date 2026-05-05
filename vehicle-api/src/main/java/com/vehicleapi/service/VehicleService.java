package com.vehicleapi.service;

import com.vehicleapi.model.Vehicle;
import com.vehicleapi.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class VehicleService {

    private final VehicleRepository repo;

    public VehicleService(VehicleRepository repo) {
        this.repo = repo;
    }

    //GET all 

    public List<Vehicle> getAll() {
        return repo.findAll();
    }

    //GET by id (required by assignment)

    public Optional<Vehicle> getById(String id) {
        return repo.findById(id);
    }

    //POST — add vehicle (required by assignment) 

    public Vehicle add(Vehicle vehicle) {
        // Generate id if not provided
        if (vehicle.getId() == null || vehicle.getId().isBlank()) {
            vehicle.setId("veh_" + UUID.randomUUID().toString().replace("-", "").substring(0, 8));
        }
        String now = Instant.now().toString();
        vehicle.setCreatedAtIso(now);
        vehicle.setUpdatedAtIso(now);
        return repo.save(vehicle);
    }

    //PUT — update vehicle (3rd HTTP method) 

    public Optional<Vehicle> update(String id, Vehicle incoming) {
        return repo.findById(id).map(existing -> {
            existing.setAssetTag(incoming.getAssetTag());
            existing.setType(incoming.getType());
            existing.setMake(incoming.getMake());
            existing.setModel(incoming.getModel());
            existing.setYear(incoming.getYear());
            existing.setPlateNumber(incoming.getPlateNumber());
            existing.setStatus(incoming.getStatus());
            existing.setAssignedDepartment(incoming.getAssignedDepartment());
            existing.setNotes(incoming.getNotes());
            existing.setUpdatedAtIso(Instant.now().toString());
            return repo.save(existing);
        });
    }

    //DELETE

    public boolean delete(String id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
