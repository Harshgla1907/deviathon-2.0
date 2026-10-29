import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import { fetchFamilyData } from './services/api'
import './App.css'

function App() {
  const [senior, setSenior] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      setSenior(await fetchFamilyData())
    } catch (err) {
      setError(err.message || 'Unable to load your parent’s care status.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setSenior(await fetchFamilyData())
      } catch (err) {
        setError(err.message || 'Unable to load your parent’s care status.')
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <header className="page-header">
          <div>
            <p className="breadcrumb">My Family <span>/</span> Today’s overview</p>
            <h1>Good morning, Rajesh</h1>
            <p>Here is your mother’s health and wellbeing status.</p>
          </div>
          <button className="refresh-button" onClick={loadData} disabled={loading}>
            <span aria-hidden="true">↻</span> Refresh
          </button>
        </header>

        {loading && <Loading />}

        {error && (
          <div className="error-state" role="alert">
            <div><strong>Could not load health data</strong><p>{error}</p></div>
            <button onClick={loadData}>Try again</button>
          </div>
        )}

        {!loading && !error && senior && (
          <>
            <section className="senior-summary">
              <div className="senior-profile">
                <span className="senior-avatar">KD</span>
                <div><small>MY PARENT</small><h2>{senior.name}</h2><p>78 years · Home monitoring active</p></div>
              </div>
              <div className="last-check"><span>Last updated</span><strong>{senior.updated}</strong></div>
            </section>

            <div className="family-grid">
              <section className={`risk-panel risk-${senior.level.toLowerCase()}`}>
                <div className="risk-heading">
                  <div><span className="eyebrow">EARLY WARNING STATUS</span><h2>{senior.level} attention</h2></div>
                  <div className="risk-score"><strong>{senior.score}</strong><span>/100</span></div>
                </div>
                <div className="risk-explanation">
                  <span>!</span>
                  <p><strong>We noticed changes in 3 areas.</strong> A single changed reading does not mean an emergency. These patterns need a human check-in today.</p>
                </div>
              </section>

              <section className="today-plan">
                <div className="card-heading">
                  <div><span className="eyebrow">YOUR NEXT STEPS</span><h2>Today’s plan</h2></div>
                  <span className="plan-count">3 tasks</span>
                </div>
                <div className="plan-item priority">
                  <span className="task-check">1</span>
                  <div><strong>Call Mom this morning</strong><p>Ask about medicines, appetite and hydration</p></div>
                  <button aria-label="Start call">Call</button>
                </div>
                <div className="plan-item">
                  <span className="task-check">2</span>
                  <div><strong>Review missed medicines</strong><p>6 of 7 days missed during this week</p></div>
                  <button aria-label="Review medicines">View</button>
                </div>
                <div className="plan-item">
                  <span className="task-check">3</span>
                  <div><strong>Check food and BP</strong><p>Food down by 40% · BP above personal baseline</p></div>
                  <button aria-label="Check measurements">Check</button>
                </div>
              </section>
            </div>

            <section className="signal-section">
              <div className="section-heading">
                <div><span className="eyebrow">WHAT CHANGED</span><h2>Health signals</h2></div>
                <span className="baseline-note">Compared with her own normal</span>
              </div>
              <div className="signal-grid">
                <article>
                  <span className="signal-icon bp">BP</span>
                  <div><small>Blood pressure</small><strong>158/96</strong><p>16 higher than her usual systolic</p></div>
                </article>
                <article>
                  <span className="signal-icon medicine">Rx</span>
                  <div><small>Medicines</small><strong>6 missed</strong><p>Missed pattern across 7 days</p></div>
                </article>
                <article>
                  <span className="signal-icon food">✓</span>
                  <div><small>Food intake</small><strong>40% lower</strong><p>Compared with her usual week</p></div>
                </article>
              </div>
            </section>

            <section className="call-note">
              <div className="note-icon">“</div>
              <div><span className="eyebrow">LATEST CALL NOTE</span><blockquote>“Dawai bhool gayi, bhookh kam lagti hai”</blockquote><p>Hinglish context understood · “koi dard nahi” is not counted as pain</p></div>
            </section>

            <p className="safety-note">This is an early warning, not a diagnosis. Contact a doctor or emergency services when symptoms feel urgent.</p>
          </>
        )}
      </main>
    </div>
  )
}

export default App
