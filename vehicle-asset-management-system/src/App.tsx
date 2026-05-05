import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { VehicleCreatePage } from './pages/VehicleCreatePage'
import { VehicleEditPage } from './pages/VehicleEditPage'
import { VehicleListPage } from './pages/VehicleListPage'

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicles/new" element={<VehicleCreatePage />} />
        <Route path="/vehicles/:vehicleId/edit" element={<VehicleEditPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}

