import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, PageHeader } from '../components/Ui'
import { VehicleForm, type VehicleFormValue } from '../components/VehicleForm'
import { addVehicle } from '../data/vehicleStore'

export function VehicleCreatePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const initial: VehicleFormValue = {
    assetTag:           '',
    vehicleType:        'Car',
    make:               '',
    model:              '',
    manufactureYear:    new Date().getFullYear(),
    plateNumber:        '',
    status:             'Active',
    assignedDepartment: '',
    notes:              '',
    // Car defaults
    numberOfDoors:      4,
    fuelType:           'Petrol',
  }

  return (
    <div className="stack">
      <PageHeader title="Add Vehicle" subtitle="Create a new vehicle asset record." />
      <Card>
        <VehicleForm
          initial={initial}
          submitLabel="Create"
          onCancel={() => navigate('/vehicles')}
          onSubmit={async (v) => {
            setLoading(true)
            try {
              await addVehicle(v)
              navigate('/vehicles')
            } catch (e: any) {
              console.error(e)
              alert(e.message || 'Failed to add vehicle.')
            } finally {
              setLoading(false)
            }
          }}
        />
      </Card>
    </div>
  )
}