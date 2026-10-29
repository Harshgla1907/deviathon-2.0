import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import { fetchCoordinatorData } from './services/api'
import './App.css'

function App() {
  const [seniors, setSeniors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(1)

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchCoordinatorData()
      setSeniors(result)
      setSelectedId(result[0]?.id ?? null)
    } catch (err) {
      setError(err.message || 'Unable to load care coordination data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setSeniors(await fetchCoordinatorData())
      } catch (err) {
        setError(err.message || 'Unable to load care coordination data.')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const sortedSeniors = useMemo(
    () => [...seniors].sort((a, b) => b.score - a.score),
    [seniors],
  )

  const visibleSeniors = filter === 'All'
    ? sortedSeniors
    : sortedSeniors.filter((senior) => senior.level === filter)

  const selected = sortedSeniors.find((senior) => senior.id === selectedId) ?? sortedSeniors[0]
  const criticalCount = seniors.filter((senior) => senior.level === 'Critical' || senior.level === 'High').length
  const watchCount = seniors.filter((senior) => senior.level === 'Watch').length
  const stableCount = seniors.filter((senior) => senior.level === 'Stable').length

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <header className="page-header coordinator-header">
          <div>
            <p className="breadcrumb">Care Coordination <span>/</span> Daily priorities</p>
            <h1>Good morning, Ananya</h1>
            <p>Review changes across vitals, medicines and call notes.</p>
          </div>
          <button className="refresh-button" onClick={loadData} disabled={loading}>
            <span aria-hidden="true">↻</span> Refresh
          </button>
        </header>

        <section className="summary-grid" aria-label="Care summary">
          <article><span className="summary-icon high">!</span><div><strong>{criticalCount}</strong><p>Need attention</p></div></article>
          <article><span className="summary-icon watch">◷</span><div><strong>{watchCount}</strong><p>Monitor closely</p></div></article>
          <article><span className="summary-icon stable">✓</span><div><strong>{stableCount}</strong><p>Stable today</p></div></article>
          <article><span className="summary-icon families">12</span><div><strong>12</strong><p>Families monitored</p></div></article>
        </section>

        {loading && <Loading />}

        {error && (
          <div className="error-state" role="alert">
            <div><strong>Could not load coordinator data</strong><p>{error}</p></div>
            <button onClick={loadData}>Try again</button>
          </div>
        )}

        {!loading && !error && (
          <div className="coordinator-grid">
            <section className="priority-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">Sorted by personal risk</span>
                  <h2>Today’s priority list</h2>
                </div>
                <span className="today-date">29 Oct</span>
              </div>

              <div className="filter-tabs" aria-label="Filter seniors">
                {['All', 'Critical', 'High', 'Watch', 'Stable'].map((item) => (
                  <button
                    key={item}
                    className={filter === item ? 'active' : ''}
                    onClick={() => setFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="senior-list">
                {visibleSeniors.map((senior) => (
                  <button
                    type="button"
                    className={`senior-row ${selected?.id === senior.id ? 'selected' : ''}`}
                    key={senior.id}
                    onClick={() => setSelectedId(senior.id)}
                  >
                    <span className={`avatar avatar-${senior.level.toLowerCase()}`}>{senior.initials}</span>
                    <span className="senior-main">
                      <strong>{senior.name}</strong>
                      <small>{senior.age} years · Updated {senior.updated}</small>
                    </span>
                    <span className="risk-column">
                      <strong>{senior.score}</strong>
                      <small className={`level-${senior.level.toLowerCase()}`}>{senior.level}</small>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {selected && (
              <aside className="detail-panel">
                <div className="detail-header">
                  <div>
                    <span className="eyebrow">Highest priority</span>
                    <h2>{selected.name}</h2>
                    <p>{selected.age} years · Personal baseline monitored</p>
                  </div>
                  <div className={`score-ring score-${selected.level.toLowerCase()}`}>
                    <strong>{selected.score}</strong>
                    <span>/100</span>
                  </div>
                </div>

                <section className="signal-section">
                  <h3>Why this is flagged</h3>
                  <div className="signal-grid">
                    <article><span>Vitals</span><strong>{selected.vitals}</strong><small>Compared with {selected.baseline}</small></article>
                    <article><span>Medicines</span><strong>{selected.medicine}</strong><small>Pattern across the last 7 days</small></article>
                    <article><span>Daily signal</span><strong>{selected.signal}</strong><small>Observed change, not diagnosis</small></article>
                  </div>
                </section>

                <section className="note-section">
                  <div className="section-label"><span>Call note</span><small>Hinglish cue detected</small></div>
                  <blockquote>{selected.note}</blockquote>
                </section>

                <section className="action-section">
                  <span className="action-icon">→</span>
                  <div><small>Recommended next action</small><strong>{selected.action}</strong></div>
                </section>

                <button className="call-button">Start care call <span>→</span></button>
                <p className="privacy-note">🔒 Consent on · Coordinator-only view · No diagnosis generated</p>
              </aside>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
