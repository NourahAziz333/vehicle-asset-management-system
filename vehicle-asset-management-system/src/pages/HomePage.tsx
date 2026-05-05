import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ensureVehicleSeedData, listVehicles } from '../data/vehicleStore'
import { Vehicle } from '../domain/Vehicle'
import { Badge, Button, Card, PageHeader } from '../components/Ui'

export function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureVehicleSeedData()
      .then(() => listVehicles())
      .then((data) => setVehicles(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const active = vehicles.filter((v) => v.props.status === 'Active').length
  const maintenance = vehicles.filter((v) => v.props.status === 'In Maintenance').length
  const retired = vehicles.filter((v) => v.props.status === 'Retired').length

  if (loading) return <div className="stack"><p>Loading...</p></div>

  return (
    <div className="stack">
      <PageHeader
        title="Dashboard"
        subtitle="Track and manage company vehicle assets."
        actions={
          <Link to="/vehicles/new" className="linkAsBtn">
            <Button variant="primary">Add Vehicle</Button>
          </Link>
        }
      />

      <div className="grid3">
        <Card>
          <div className="kpi">
            <div className="kpi__label">Total Vehicles</div>
            <div className="kpi__value">{vehicles.length}</div>
          </div>
        </Card>
        <Card>
          <div className="kpi">
            <div className="kpi__label">Active</div>
            <div className="kpi__value">{active}</div>
            <div className="kpi__meta">
              <Badge tone="good">In service</Badge>
            </div>
          </div>
        </Card>
        <Card>
          <div className="kpi">
            <div className="kpi__label">Maintenance / Retired</div>
            <div className="kpi__value">
              {maintenance} / {retired}
            </div>
            <div className="kpi__meta">
              <Badge tone="warn">Needs attention</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="split">
          <div>
            <h2 className="h2">Quick actions</h2>
            <p className="muted">
              Use the menu to navigate: list vehicles, add a new asset, edit records, or remove retired vehicles.
            </p>
          </div>
          <div className="row">
            <Link to="/vehicles" className="linkAsBtn">
              <Button>View Vehicles</Button>
            </Link>
            <Link to="/about" className="linkAsBtn">
              <Button variant="neutral">About Team</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}