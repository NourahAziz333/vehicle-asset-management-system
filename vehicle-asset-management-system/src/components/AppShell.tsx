import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function AppShell(props: { children: ReactNode }) {
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__inner container">
          <div className="brand">
            <div className="brand__mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 10.5L4 4H15L17 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="1" y="10.5" width="16" height="7" rx="1" stroke="white" strokeWidth="1.5"/>
                <path d="M17 10.5H21L23 14.5V17.5H17V10.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="5.5" cy="18.5" r="2" stroke="white" strokeWidth="1.5"/>
                <circle cx="13.5" cy="18.5" r="2" stroke="white" strokeWidth="1.5"/>
                <circle cx="20.5" cy="18.5" r="2" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="brand__text">
              <div className="brand__title">Vehicle Asset Management</div>
              <div className="brand__subtitle">Company Vehicle Asset Management System</div>
            </div>
          </div>

          <nav className="nav" aria-label="Main menu">
            <NavLink className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')} to="/vehicles">
              Vehicles
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')} to="/vehicles/new">
              Add Vehicle
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')} to="/about">
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="container">{props.children}</div>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <span>Vehicle Asset Management System &mdash; Part II</span>
          <span className="footer__muted">React + Spring Boot</span>
        </div>
      </footer>
    </div>
  )
}