import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import RiskCard from './components/RiskCard'
import Loading from './components/Loading'
import { fetchSafetyData, locations } from './services/api'
import './App.css'

function App() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async (location = selectedLocation) => {
    setLoading(true)
    setError('')
    try {
      setData(await fetchSafetyData(location))
    } catch (err) {
      setError(err.message || 'Unable to load safety data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setData(await fetchSafetyData(locations[0]))
      } catch (err) {
        setError(err.message || 'Unable to load safety data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const selectLocation = (event) => {
    const location = locations.find((item) => item.name === event.target.value)
    setSelectedLocation(location)
    loadData(location)
  }

  const metricCards = data ? [
    { label: 'Temperature', value: `${data.temperature}°C`, note: `Feels like ${data.apparent}°C`, icon: '🌡️' },
    { label: 'Humidity', value: `${data.humidity}%`, note: data.humidity > 75 ? 'High moisture' : 'Comfortable range', icon: '💧' },
    { label: 'Wind speed', value: `${data.wind} km/h`, note: data.wind >= 25 ? 'Strong winds' : 'Calm conditions', icon: '≋' },
    { label: 'Precipitation', value: `${data.precipitation} mm`, note: data.weather, icon: '☂' },
  ] : []

  const riskSubtitle = {
    Low: 'Conditions are safe. Continue normal indoor monitoring.',
    Medium: 'Stay alert. Check the senior and review environmental conditions.',
    High: 'Immediate attention recommended. Take preventive safety action.',
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <header className="page-header">
          <div>
            <p className="breadcrumb">Dashboard <span>/</span> Home Overview</p>
            <h1>Good morning, Rajesh</h1>
            <p>Here is your parent’s safety overview.</p>
          </div>
          <button className="refresh-button" onClick={() => loadData()} disabled={loading}>
            <span aria-hidden="true">↻</span> Refresh data
          </button>
        </header>

        <section className="location-panel">
          <label htmlFor="location">Monitoring location</label>
          <div className="location-select">
            <span aria-hidden="true">⌖</span>
            <select id="location" value={selectedLocation.name} onChange={selectLocation}>
              {locations.map((location) => (
                <option key={location.name} value={location.name}>{location.name}</option>
              ))}
            </select>
          </div>
        </section>

        {loading && <Loading />}

        {error && (
          <div className="error-state" role="alert">
            <div><strong>Could not load live data</strong><p>{error}</p></div>
            <button onClick={() => loadData()} disabled={loading}>Try again</button>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <div className="dashboard-grid">
              <RiskCard status={data.status} score={data.score} subtitle={riskSubtitle[data.status]} />
              <section className="activity-card">
                <div className="card-heading">
                  <div>
                    <span className="eyebrow">Today’s monitoring</span>
                    <h2>Activity summary</h2>
                  </div>
                  <span className="updated">Updated {data.updatedAt}</span>
                </div>
                <div className="activity-row">
                  <span className="activity-icon">◉</span>
                  <div><strong>12:40 PM</strong><p>Indoor movement detected</p></div>
                  <span className="normal-badge">Normal</span>
                </div>
                <div className="activity-row">
                  <span className="activity-icon medicine">✓</span>
                  <div><strong>10:30 AM</strong><p>Medicine reminder completed</p></div>
                  <span className="normal-badge">On time</span>
                </div>
                <button className="view-all">View activity history <span>→</span></button>
              </section>
            </div>

            <section className="metrics-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Live environment</span>
                  <h2>Safety metrics</h2>
                </div>
                <span className="location-chip">⌖ {data.location}</span>
              </div>
              <div className="metrics-grid">
                {metricCards.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <span className="metric-icon">{metric.icon}</span>
                    <div>
                      <p>{metric.label}</p>
                      <strong>{metric.value}</strong>
                      <small>{metric.note}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="recommendation">
              <span className="recommendation-icon">♡</span>
              <div>
                <span className="eyebrow">AI recommendation</span>
                <p>{data.status === 'High'
                  ? 'Check on your loved one now and ensure the home environment is safe.'
                  : data.status === 'Medium'
                    ? 'Monitor the current conditions and keep emergency contacts available.'
                    : 'All monitored conditions are within a safe range. Keep regular check-ins.'}</p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
