import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// @ts-ignore
import NameBankDashboard from './pages/NameBankDashboard'

import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <img src='/aka_black_3sm.png' alt="Logo" className="app-logo" />
          <h1>Naming Platform Backend</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<NameBankDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App




