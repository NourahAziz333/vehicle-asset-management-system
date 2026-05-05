import { Card, PageHeader } from '../components/Ui'

export function AboutPage() {
  return (
    <div className="stack">
      <PageHeader title="About" subtitle="Team members and project information." />

      <Card>
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Norah Alarifi</td>
                <td>223410672</td>
              </tr>
              <tr>
                <td>Ghala Aljarallah</td>
                <td>222410294</td>
              </tr>
              <tr>
                <td>Jana Altalhi</td>
                <td>221410589</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="h2">Project scope</h2>
        <ul className="list">
          <li>Full-stack application: React + TypeScript frontend, Spring Boot backend.</li>
          <li>Backend REST API with five asset classes: Car, Van, Truck, Bus, and Motorcycle.</li>
          <li>JOINED inheritance strategy with H2 in-memory database seeded via schema.sql and data.sql.</li>
          <li>CRUD: add, update, delete, and display vehicle asset records across all types.</li>
          <li>Type-specific fields rendered dynamically in the form based on selected vehicle type.</li>
          <li>Navigation menu to access all features.</li>
        </ul>
      </Card>
    </div>
  )
}