import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Vehicle } from '../domain/Vehicle'
import { Badge, Button, Card, PageHeader } from '../components/Ui'
import { deleteVehicle, ensureVehicleSeedData, listVehicles } from '../data/vehicleStore'

function statusTone(status: string): 'good' | 'warn' | 'muted' {
  if (status === 'Active') return 'good'
  if (status === 'In Maintenance') return 'warn'
  return 'muted'
}

export function VehicleListPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ensureVehicleSeedData()
      .then(() => listVehicles())
      .then((data) => setVehicles(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [refreshKey])

  const filteredVehicles = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return vehicles
    return vehicles.filter((v) => {
      const p = v.props
      return (
        p.assetTag.toLowerCase().includes(q) ||
        p.make.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.plateNumber.toLowerCase().includes(q) ||
        p.assignedDepartment.toLowerCase().includes(q) ||
        p.vehicleType.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      )
    })
  }, [query, vehicles])

  if (loading) return <div className="stack"><p>Loading...</p></div>

  return (
    <div className="stack">
      <PageHeader
        title="Vehicles"
        subtitle="Add, update, delete, and view vehicle asset records."
        actions={
          <Link to="/vehicles/new" className="linkAsBtn">
            <Button variant="primary">Add Vehicle</Button>
          </Link>
        }
      />

      <Card>
        <div className="row row--between row--wrap">
          <div className="field field--inline">
            <label className="label" htmlFor="search">
              Search
            </label>
            <input
              id="search"
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="asset tag, make, model, plate..."
            />
          </div>
          <div className="muted">Showing {filteredVehicles.length} vehicle(s)</div>
        </div>
      </Card>

      <Card>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Type</th>
                <th>Make / Model</th>
                <th>Year</th>
                <th>Plate</th>
                <th>Status</th>
                <th>Department</th>
                <th className="thRight">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((v) => {
                const p = v.props
                return (
                  <tr key={p.id}>
                    <td className="mono">{p.assetTag}</td>
                    <td>{p.vehicleType}</td>
                    <td>
                      {p.make} {p.model}
                    </td>
                    <td>{p.manufactureYear}</td>
                    <td className="mono">{p.plateNumber}</td>
                    <td>
                      <Badge tone={statusTone(p.status)}>{p.status}</Badge>
                    </td>
                    <td>{p.assignedDepartment}</td>
                    <td className="tdRight">
                      <div className="row row--tight">
                        <Button variant="neutral" onClick={() => navigate(`/vehicles/${p.id}/edit`)}>
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            const ok = window.confirm(`Delete ${p.assetTag} (${p.make} ${p.model})?`)
                            if (!ok) return
                            deleteVehicle(p.id)
                              .then(() => setRefreshKey((k) => k + 1))
                              .catch((err) => alert('Failed to delete: ' + err))
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="empty">
                    No vehicles found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}