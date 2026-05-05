import { Vehicle, type VehicleProps } from '../domain/Vehicle'

const STORAGE_KEY = 'vam.vehicles.v1'

export class VehicleRepository {
  loadAll(): Vehicle[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as VehicleProps[]
    return parsed.map((p) => new Vehicle(p))
  }

  saveAll(vehicles: Vehicle[]): void {
    const payload = vehicles.map((v) => v.props)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  ensureSeeded(): void {
    const existing = this.loadAll()
    if (existing.length >= 3) return

    const seed = [
      Vehicle.create({
        id: 'veh_001',
        assetTag: 'TRN-001',
        vehicleType: 'Van',
        make: 'Toyota',
        model: 'HiAce',
        manufactureYear: 2021,
        plateNumber: 'KSA-2145',
        status: 'Active',
        assignedDepartment: 'Operations',
        notes: 'Delivery van for daily routes.',
        cargoVolumeM3: 6.2,
        hasSlidingDoor: true,
      }),
      Vehicle.create({
        id: 'veh_002',
        assetTag: 'TRN-002',
        vehicleType: 'Car',
        make: 'Hyundai',
        model: 'Elantra',
        manufactureYear: 2022,
        plateNumber: 'KSA-8871',
        status: 'In Maintenance',
        assignedDepartment: 'Admin',
        notes: 'Scheduled service this week.',
        numberOfDoors: 4,
        fuelType: 'Petrol',
      }),
      Vehicle.create({
        id: 'veh_003',
        assetTag: 'TRN-003',
        vehicleType: 'Truck',
        make: 'Isuzu',
        model: 'N-Series',
        manufactureYear: 2020,
        plateNumber: 'KSA-4509',
        status: 'Active',
        assignedDepartment: 'Warehouse',
        notes: 'Used for warehouse transfers.',
        payloadCapacityKg: 4500,
        hasRefrigerationUnit: false,
      }),
    ]

    this.saveAll(seed)
  }
}