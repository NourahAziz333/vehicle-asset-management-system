export type VehicleType = 'Car' | 'Van' | 'Truck' | 'Bus' | 'Motorcycle'
export type VehicleStatus = 'Active' | 'In Maintenance' | 'Retired'
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric'

export type VehicleProps = {
  id: string
  assetTag: string
  vehicleType: VehicleType
  make: string
  model: string
  manufactureYear: number
  plateNumber: string
  status: VehicleStatus
  assignedDepartment: string
  notes: string
  createdAtIso: string
  updatedAtIso: string
  // Car
  numberOfDoors?: number
  fuelType?: FuelType
  // Van
  cargoVolumeM3?: number
  hasSlidingDoor?: boolean
  // Truck
  payloadCapacityKg?: number
  hasRefrigerationUnit?: boolean
  // Bus
  seatingCapacity?: number
  isArticulated?: boolean
  // Motorcycle
  engineCC?: number
  hasSidecar?: boolean
}

export class Vehicle {
  private _props: VehicleProps

  constructor(props: VehicleProps) {
    this._props = { ...props }
  }

  get props(): VehicleProps {
    return { ...this._props }
  }

  update(next: Partial<Omit<VehicleProps, 'id' | 'createdAtIso'>>): Vehicle {
    const updatedAtIso = new Date().toISOString()
    return new Vehicle({
      ...this._props,
      ...next,
      updatedAtIso,
    })
  }

  static create(input: Omit<VehicleProps, 'id' | 'createdAtIso' | 'updatedAtIso'> & { id?: string }): Vehicle {
    const nowIso = new Date().toISOString()
    const id = input.id ?? crypto.randomUUID()
    return new Vehicle({
      ...input,
      id,
      createdAtIso: nowIso,
      updatedAtIso: nowIso,
      assetTag: input.assetTag.trim(),
      make: input.make.trim(),
      model: input.model.trim(),
      plateNumber: input.plateNumber.trim(),
      assignedDepartment: input.assignedDepartment.trim(),
      notes: input.notes.trim(),
    })
  }
}