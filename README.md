# Vehicle Asset Management System

Full-stack web application for managing company vehicle assets, built with React + TypeScript and Spring Boot.

## Overview

The system supports five vehicle asset types — **Car, Van, Truck, Bus, and Motorcycle** — each with shared common fields and type-specific attributes. It provides full CRUD functionality through a REST API backend connected to a React frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Routing | React Router |
| Backend | Spring Boot 3.2 + Java 17 |
| ORM | Spring Data JPA / Hibernate |
| Database | H2 (in-memory) |
| API | REST (JSON) |

## Project Structure

```
vehicle-asset-management-system/   ← React frontend
vehicle-api/                       ← Spring Boot backend
```

## Getting Started

### Backend
```bash
cd vehicle-api
mvn spring-boot:run
```
Runs on `http://localhost:8080`. The database is seeded automatically on startup via `schema.sql` and `data.sql`.

### Frontend
```bash
cd vehicle-asset-management-system
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/vehicles` | List all vehicles |
| GET | `/api/vehicles/{id}` | Get vehicle by ID |
| POST | `/api/vehicles` | Add a new vehicle |
| PUT | `/api/vehicles/{id}` | Update a vehicle |
| DELETE | `/api/vehicles/{id}` | Delete a vehicle |

## Team

| Name | Student ID |
|---|---|
| Norah Alarifi | 223410672 |
| Ghala Aljarallah | 222410294 |
| Jana Altalhi | 221410589 |

**Supervisor:** Dr. Hazleen Binti Aris  
**Course:** SE411 — Prince Sultan University
