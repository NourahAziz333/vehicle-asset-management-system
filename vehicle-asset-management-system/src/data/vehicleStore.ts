import { Vehicle, type VehicleProps } from '../domain/Vehicle'

const API_URL = 'http://localhost:8080/api/vehicles'

export async function ensureVehicleSeedData(): Promise<void> {
  // No-op: Backend manages data state.
}

// ── Map backend JSON → VehicleProps ───────────────────────────────────────────
// Jackson serialises boolean getters differently depending on naming:
//   hasSlidingDoor() → "slidingDoor" (strips "has" prefix)
//   isArticulated()  → "articulated" (strips "is" prefix)
//   hasSidecar()     → "sidecar"     (strips "has" prefix)
// We use ?? fallbacks to handle both possible names safely.
function fromJson(json: Record<string, unknown>): VehicleProps {
  return {
    id:                   json.id                    as string,
    assetTag:             json.assetTag               as string,
    vehicleType:          (json.vehicleType ?? json.type) as VehicleProps['vehicleType'],
    make:                 json.make                   as string,
    model:                json.model                  as string,
    manufactureYear:      (json.year ?? json.manufactureYear ?? 0) as number,
    plateNumber:          json.plateNumber             as string,
    status:               json.status                 as VehicleProps['status'],
    assignedDepartment:   json.assignedDepartment      as string,
    notes:                (json.notes ?? '')           as string,
    createdAtIso:         json.createdAtIso            as string,
    updatedAtIso:         json.updatedAtIso            as string,
    numberOfDoors:        json.numberOfDoors           as number  | undefined,
    fuelType:             json.fuelType                as VehicleProps['fuelType'],
    cargoVolumeM3:        json.cargoVolumeM3           as number  | undefined,
    hasSlidingDoor:       (json.hasSlidingDoor  ?? json.slidingDoor)  as boolean | undefined,
    payloadCapacityKg:    json.payloadCapacityKg       as number  | undefined,
    hasRefrigerationUnit: (json.hasRefrigerationUnit ?? json.refrigerationUnit) as boolean | undefined,
    seatingCapacity:      json.seatingCapacity         as number  | undefined,
    isArticulated:        (json.isArticulated   ?? json.articulated)  as boolean | undefined,
    engineCC:             json.engineCC                as number  | undefined,
    hasSidecar:           (json.hasSidecar      ?? json.sidecar)      as boolean | undefined,
  }
}

// ── Map VehicleProps → backend request body ───────────────────────────────────
function toJson(input: Omit<VehicleProps, 'id' | 'createdAtIso' | 'updatedAtIso'>): Record<string, unknown> {
  return {
    vehicleType:          input.vehicleType,
    assetTag:             input.assetTag,
    make:                 input.make,
    model:                input.model,
    year:                 input.manufactureYear,
    plateNumber:          input.plateNumber,
    status:               input.status,
    assignedDepartment:   input.assignedDepartment,
    notes:                input.notes,
    numberOfDoors:        input.numberOfDoors,
    fuelType:             input.fuelType,
    cargoVolumeM3:        input.cargoVolumeM3,
    hasSlidingDoor:       input.hasSlidingDoor,
    payloadCapacityKg:    input.payloadCapacityKg,
    hasRefrigerationUnit: input.hasRefrigerationUnit,
    seatingCapacity:      input.seatingCapacity,
    isArticulated:        input.isArticulated,
    engineCC:             input.engineCC,
    hasSidecar:           input.hasSidecar,
  }
}

export async function listVehicles(): Promise<Vehicle[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Failed to fetch vehicles')
  const json: Record<string, unknown>[] = await res.json()
  return json
    .map((p) => new Vehicle(fromJson(p)))
    .sort((a, b) => b.props.updatedAtIso.localeCompare(a.props.updatedAtIso))
}

export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  const res = await fetch(`${API_URL}/${id}`)
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error('Failed to fetch vehicle')
  const json: Record<string, unknown> = await res.json()
  return new Vehicle(fromJson(json))
}

export async function addVehicle(input: Omit<VehicleProps, 'id' | 'createdAtIso' | 'updatedAtIso'>): Promise<Vehicle> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toJson(input)),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(res.status === 409 ? text : 'Failed to add vehicle')
  }
  const json: Record<string, unknown> = await res.json()
  return new Vehicle(fromJson(json))
}

export async function updateVehicle(id: string, next: Partial<Omit<VehicleProps, 'id' | 'createdAtIso'>>): Promise<Vehicle> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toJson(next as Omit<VehicleProps, 'id' | 'createdAtIso' | 'updatedAtIso'>)),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(res.status === 409 ? text : 'Failed to update vehicle')
  }
  const json: Record<string, unknown> = await res.json()
  return new Vehicle(fromJson(json))
}

export async function deleteVehicle(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete vehicle')
}