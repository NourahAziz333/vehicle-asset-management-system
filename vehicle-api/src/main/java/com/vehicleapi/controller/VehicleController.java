package com.vehicleapi.controller;

import com.vehicleapi.model.Vehicle;
import com.vehicleapi.service.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

/**
 * VehicleController — exposes the Vehicle Asset REST API.
 *
 *  POST   /api/vehicles          → add a new vehicle          
 *  GET    /api/vehicles/{id}     → get vehicle by ID          
 *  PUT    /api/vehicles/{id}     → update a vehicle       
 *  GET    /api/vehicles          → list all vehicles  
 *  DELETE /api/vehicles/{id}     → delete a vehicle  
 */
@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")   // allows the React dev server to call this API
public class VehicleController {

    private final VehicleService service;

    public VehicleController(VehicleService service) {
        this.service = service;
    }

    // GET /api/vehicles  →  list all vehicles
    
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAll() {
        List<Vehicle> vehicles = service.getAll();
        return ResponseEntity.ok(vehicles);
    }

    // GET /api/vehicles/{id}  →  get vehicle by ID   ★ REQUIRED
    
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getById(@PathVariable String id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/vehicles  →  add new vehicle   ★ REQUIRED
    // Body (JSON):
    // {
    //   "assetTag": "TRN-010",
    //   "type": "Car",
    //   "make": "Toyota",
    //   "model": "Camry",
    //   "year": 2023,
    //   "plateNumber": "KSA-9900",
    //   "status": "Active",
    //   "assignedDepartment": "HR",
    //   "notes": "New purchase"
    // }
    
    @PostMapping
    public ResponseEntity<Vehicle> add(@RequestBody Vehicle vehicle) {
        Vehicle created = service.add(vehicle);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/vehicles/{id}  →  update vehicle   ★ 3rd HTTP METHOD
    
    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> update(@PathVariable String id,
                                          @RequestBody Vehicle vehicle) {
        return service.update(id, vehicle)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/vehicles/{id}  →  delete vehicle

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean deleted = service.delete(id);
        return deleted
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict: Duplicate Asset Tag or Plate Number.");
    }
}
