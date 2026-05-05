import { useMemo, useState } from 'react'
import type { FuelType, VehicleProps, VehicleStatus, VehicleType } from '../domain/Vehicle'
import { Button } from './Ui'

export type VehicleFormValue = Omit<VehicleProps, 'id' | 'createdAtIso' | 'updatedAtIso'>

const TYPES: VehicleType[] = ['Car', 'Van', 'Truck', 'Bus', 'Motorcycle']
const STATUSES: VehicleStatus[] = ['Active', 'In Maintenance', 'Retired']
const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'Hybrid', 'Electric']

function toInt(value: string): number {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? n : 0
}

function toFloat(value: string): number {
  const n = Number.parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

function validate(v: VehicleFormValue): string[] {
  const errors: string[] = []
  if (!v.assetTag.trim()) errors.push('Asset tag is required.')
  if (!v.make.trim()) errors.push('Make is required.')
  if (!v.model.trim()) errors.push('Model is required.')
  if (!v.plateNumber.trim()) errors.push('Plate number is required.')
  if (!v.assignedDepartment.trim()) errors.push('Assigned department is required.')
  if (v.manufactureYear < 1980 || v.manufactureYear > new Date().getFullYear() + 1)
    errors.push('Year must be valid.')
  return errors
}

// ── Type-specific fields ──────────────────────────────────────────────────────

function CarFields({ value, setValue }: { value: VehicleFormValue; setValue: React.Dispatch<React.SetStateAction<VehicleFormValue>> }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="numberOfDoors">Number of Doors</label>
        <input
          id="numberOfDoors"
          className="input"
          inputMode="numeric"
          value={String(value.numberOfDoors ?? 4)}
          onChange={(e) => setValue((s) => ({ ...s, numberOfDoors: toInt(e.target.value) }))}
          placeholder="e.g., 4"
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="fuelType">Fuel Type</label>
        <select
          id="fuelType"
          className="input"
          value={value.fuelType ?? 'Petrol'}
          onChange={(e) => setValue((s) => ({ ...s, fuelType: e.target.value as FuelType }))}
        >
          {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
    </>
  )
}

function VanFields({ value, setValue }: { value: VehicleFormValue; setValue: React.Dispatch<React.SetStateAction<VehicleFormValue>> }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="cargoVolumeM3">Cargo Volume (m³)</label>
        <input
          id="cargoVolumeM3"
          className="input"
          inputMode="decimal"
          value={String(value.cargoVolumeM3 ?? 0)}
          onChange={(e) => setValue((s) => ({ ...s, cargoVolumeM3: toFloat(e.target.value) }))}
          placeholder="e.g., 6.2"
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="hasSlidingDoor">Sliding Door</label>
        <select
          id="hasSlidingDoor"
          className="input"
          value={value.hasSlidingDoor ? 'true' : 'false'}
          onChange={(e) => setValue((s) => ({ ...s, hasSlidingDoor: e.target.value === 'true' }))}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  )
}

function TruckFields({ value, setValue }: { value: VehicleFormValue; setValue: React.Dispatch<React.SetStateAction<VehicleFormValue>> }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="payloadCapacityKg">Payload Capacity (kg)</label>
        <input
          id="payloadCapacityKg"
          className="input"
          inputMode="decimal"
          value={String(value.payloadCapacityKg ?? 0)}
          onChange={(e) => setValue((s) => ({ ...s, payloadCapacityKg: toFloat(e.target.value) }))}
          placeholder="e.g., 5000"
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="hasRefrigerationUnit">Refrigeration Unit</label>
        <select
          id="hasRefrigerationUnit"
          className="input"
          value={value.hasRefrigerationUnit ? 'true' : 'false'}
          onChange={(e) => setValue((s) => ({ ...s, hasRefrigerationUnit: e.target.value === 'true' }))}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  )
}

function BusFields({ value, setValue }: { value: VehicleFormValue; setValue: React.Dispatch<React.SetStateAction<VehicleFormValue>> }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="seatingCapacity">Seating Capacity</label>
        <input
          id="seatingCapacity"
          className="input"
          inputMode="numeric"
          value={String(value.seatingCapacity ?? 0)}
          onChange={(e) => setValue((s) => ({ ...s, seatingCapacity: toInt(e.target.value) }))}
          placeholder="e.g., 45"
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="isArticulated">Articulated</label>
        <select
          id="isArticulated"
          className="input"
          value={value.isArticulated ? 'true' : 'false'}
          onChange={(e) => setValue((s) => ({ ...s, isArticulated: e.target.value === 'true' }))}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  )
}

function MotorcycleFields({ value, setValue }: { value: VehicleFormValue; setValue: React.Dispatch<React.SetStateAction<VehicleFormValue>> }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="engineCC">Engine CC</label>
        <input
          id="engineCC"
          className="input"
          inputMode="numeric"
          value={String(value.engineCC ?? 250)}
          onChange={(e) => setValue((s) => ({ ...s, engineCC: toInt(e.target.value) }))}
          placeholder="e.g., 650"
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="hasSidecar">Has Sidecar</label>
        <select
          id="hasSidecar"
          className="input"
          value={value.hasSidecar ? 'true' : 'false'}
          onChange={(e) => setValue((s) => ({ ...s, hasSidecar: e.target.value === 'true' }))}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </>
  )
}

// ── Main form ─────────────────────────────────────────────────────────────────

export function VehicleForm(props: {
  initial: VehicleFormValue
  submitLabel: string
  onSubmit: (value: VehicleFormValue) => void
  onCancel: () => void
}) {
  const [value, setValue] = useState<VehicleFormValue>(props.initial)
  const [touched, setTouched] = useState(false)

  const errors = useMemo(() => (touched ? validate(value) : []), [touched, value])
  const canSubmit = errors.length === 0

  function renderTypeFields() {
    switch (value.vehicleType) {
      case 'Car':        return <CarFields value={value} setValue={setValue} />
      case 'Van':        return <VanFields value={value} setValue={setValue} />
      case 'Truck':      return <TruckFields value={value} setValue={setValue} />
      case 'Bus':        return <BusFields value={value} setValue={setValue} />
      case 'Motorcycle': return <MotorcycleFields value={value} setValue={setValue} />
    }
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
        const nextErrors = validate(value)
        if (nextErrors.length > 0) return
        props.onSubmit(value)
      }}
    >
      <div className="grid2">
        <div className="field">
          <label className="label" htmlFor="assetTag">Asset Tag</label>
          <input
            id="assetTag"
            className="input"
            value={value.assetTag}
            onChange={(e) => setValue((s) => ({ ...s, assetTag: e.target.value }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., TRN-014"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="vehicleType">Vehicle Type</label>
          <select
            id="vehicleType"
            className="input"
            value={value.vehicleType}
            onChange={(e) => setValue((s) => ({ ...s, vehicleType: e.target.value as VehicleType }))}
          >
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="make">Make</label>
          <input
            id="make"
            className="input"
            value={value.make}
            onChange={(e) => setValue((s) => ({ ...s, make: e.target.value }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Toyota"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="model">Model</label>
          <input
            id="model"
            className="input"
            value={value.model}
            onChange={(e) => setValue((s) => ({ ...s, model: e.target.value }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., HiAce"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="manufactureYear">Year</label>
          <input
            id="manufactureYear"
            className="input"
            inputMode="numeric"
            value={String(value.manufactureYear)}
            onChange={(e) => setValue((s) => ({ ...s, manufactureYear: toInt(e.target.value) }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., 2022"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="plateNumber">Plate Number</label>
          <input
            id="plateNumber"
            className="input"
            value={value.plateNumber}
            onChange={(e) => setValue((s) => ({ ...s, plateNumber: e.target.value }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., KSA-1234"
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="status">Status</label>
          <select
            id="status"
            className="input"
            value={value.status}
            onChange={(e) => setValue((s) => ({ ...s, status: e.target.value as VehicleStatus }))}
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="field">
          <label className="label" htmlFor="assignedDepartment">Assigned Department</label>
          <input
            id="assignedDepartment"
            className="input"
            value={value.assignedDepartment}
            onChange={(e) => setValue((s) => ({ ...s, assignedDepartment: e.target.value }))}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Operations"
          />
        </div>
      </div>

      {/* Type-specific fields */}
      <div className="typeFields">
        <div className="typeFields__label">{value.vehicleType} specifics</div>
        <div className="grid2">
          {renderTypeFields()}
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          className="input textarea"
          value={value.notes}
          onChange={(e) => setValue((s) => ({ ...s, notes: e.target.value }))}
          placeholder="Optional..."
        />
      </div>

      {errors.length > 0 ? (
        <div className="alert" role="alert" aria-live="polite">
          <div className="alert__title">Please fix the following:</div>
          <ul className="alert__list">
            {errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="row row--right">
        <Button variant="neutral" onClick={props.onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={!canSubmit}>
          {props.submitLabel}
        </Button>
      </div>
    </form>
  )
}