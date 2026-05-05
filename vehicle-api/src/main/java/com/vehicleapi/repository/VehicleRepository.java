package com.vehicleapi.repository;

import com.vehicleapi.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {

    // Spring generates the SQL automatically from the method name
    List<Vehicle> findByStatus(String status);
}
