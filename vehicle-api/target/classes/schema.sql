CREATE TABLE IF NOT EXISTS vehicles (
    id VARCHAR(50) PRIMARY KEY,
    asset_tag VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    "year" INT NOT NULL,
    plate_number VARCHAR(30) NOT NULL UNIQUE,
    status VARCHAR(30) NOT NULL,
    assigned_department VARCHAR(100) NOT NULL,
    notes VARCHAR(500),
    created_at VARCHAR(50),
    updated_at VARCHAR(50)
);