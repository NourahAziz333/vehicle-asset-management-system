import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Vehicle } from '../domain/Vehicle'
import { Card, PageHeader } from '../components/Ui'
import { VehicleForm, type VehicleFormValue } from '../components/VehicleForm'
import { getVehicleById, updateVehicle } from '../data/vehicleStore'

export function VehicleEditPage() {
  const navigate = useNavigate()
  const params = useParams()
  const vehicleId = params.vehicleId ?? ''

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getVehicleById(vehicleId)
      .then((v) => setVehicle(v ?? null))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [vehicleId])

  if (loading) return <div className="stack"><p>Loading...</p></div>

  if (!vehicle) {
    return (
      <div className="stack">
        <PageHeader title="Vehicle not found" subtitle="The selected vehicle record does not exist." />
        <Card>
          <div className="row row--right">
            <button className="btn btn--primary" onClick={() => navigate('/vehicles')}>
              Back to Vehicles
            </button>
          </div>
        </Card>
      </div>
    )
  }

  const p = vehicle.props
  const initial: VehicleFormValue = {
    assetTag:             p.assetTag,
    vehicleType:          p.vehicleType,
    make:                 p.make,
    model:                p.model,
    manufactureYear:      p.manufactureYear,
    plateNumber:          p.plateNumber,
    status:               p.status,
    assignedDepartment:   p.assignedDepartment,
    notes:                p.notes,
    // type-specific fields — passed through so the form pre-fills correctly
    numberOfDoors:        p.numberOfDoors,
    fuelType:             p.fuelType,
    cargoVolumeM3:        p.cargoVolumeM3,
    hasSlidingDoor:       p.hasSlidingDoor,
    payloadCapacityKg:    p.payloadCapacityKg,
    hasRefrigerationUnit: p.hasRefrigerationUnit,
    seatingCapacity:      p.seatingCapacity,
    isArticulated:        p.isArticulated,
    engineCC:             p.engineCC,
    hasSidecar:           p.hasSidecar,
  }

  return (
    <div className="stack">
      <PageHeader title="Edit Vehicle" subtitle={`Update asset: ${p.assetTag}`} />
      <Card>
        <VehicleForm
          initial={initial}
          submitLabel="Save changes"
          onCancel={() => navigate('/vehicles')}
          onSubmit={async (v) => {
            setSaving(true)
            try {
              await updateVehicle(vehicleId, v)
              navigate('/vehicles')
            } catch (e: any) {
              console.error(e)
              alert(e.message || 'Failed to update vehicle.')
            } finally {
              setSaving(false)
            }
          }}
        />
      </Card>
    </div>
  )
}