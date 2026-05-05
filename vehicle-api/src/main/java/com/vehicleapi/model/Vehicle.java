package com.vehicleapi.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @Column(name = "id", nullable = false, unique = true, length = 50)
    private String id;

    @Column(name = "asset_tag", nullable = false, unique = true, length = 50)
    private String assetTag;

    @Column(name = "type", nullable = false, length = 20)
    private String type;          // Car | Van | Truck | Bus | Motorcycle

    @Column(name = "make", nullable = false, length = 100)
    private String make;

    @Column(name = "model", nullable = false, length = 100)
    private String model;

    // Fixed: Escaped reserved keyword "year" for H2 compatibility
    @Column(name = "\"year\"", nullable = false)
    private int year;

    @Column(name = "plate_number", nullable = false, unique = true, length = 30)
    private String plateNumber;

    @Column(name = "status", nullable = false, length = 30)
    private String status;        // Active | In Maintenance | Retired

    @Column(name = "assigned_department", nullable = false, length = 100)
    private String assignedDepartment;

    @Column(name = "notes", length = 500)
    private String notes;

    @Column(name = "created_at")
    private String createdAtIso;

    @Column(name = "updated_at")
    private String updatedAtIso;

    public Vehicle() {}

    public Vehicle(String id, String assetTag, String type, String make,
                   String model, int year, String plateNumber, String status,
                   String assignedDepartment, String notes) {
        this.id                 = id;
        this.assetTag           = assetTag;
        this.type               = type;
        this.make               = make;
        this.model              = model;
        this.year               = year;
        this.plateNumber        = plateNumber;
        this.status             = status;
        this.assignedDepartment = assignedDepartment;
        this.notes              = notes != null ? notes : "";
        String now              = Instant.now().toString();
        this.createdAtIso       = now;
        this.updatedAtIso       = now;
    }

    public String getId()                          { return id; }
    public void   setId(String id)                 { this.id = id; }

    public String getAssetTag()                    { return assetTag; }
    public void   setAssetTag(String assetTag)     { this.assetTag = assetTag; }

    public String getType()                        { return type; }
    public void   setType(String type)             { this.type = type; }

    public String getMake()                        { return make; }
    public void   setMake(String make)             { this.make = make; }

    public String getModel()                       { return model; }
    public void   setModel(String model)           { this.model = model; }

    public int    getYear()                        { return year; }
    public void   setYear(int year)                { this.year = year; }

    public String getPlateNumber()                 { return plateNumber; }
    public void   setPlateNumber(String p)         { this.plateNumber = p; }

    public String getStatus()                      { return status; }
    public void   setStatus(String status)         { this.status = status; }

    public String getAssignedDepartment()          { return assignedDepartment; }
    public void   setAssignedDepartment(String d)  { this.assignedDepartment = d; }

    public String getNotes()                       { return notes; }
    public void   setNotes(String notes)           { this.notes = notes; }

    public String getCreatedAtIso()                { return createdAtIso; }
    public void   setCreatedAtIso(String c)        { this.createdAtIso = c; }

    public String getUpdatedAtIso()                { return updatedAtIso; }
    public void   setUpdatedAtIso(String u)        { this.updatedAtIso = u; }
}