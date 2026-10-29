function RiskCard({ status, score, subtitle }) {
  const normalized = status.toLowerCase()

  return (
    <section className={`risk-card risk-${normalized}`}>
      <div className="risk-card-header">
        <div>
          <span className="eyebrow">Current risk status</span>
          <h2>{status} Risk</h2>
        </div>
        <div className="risk-icon" aria-hidden="true">
          {normalized === 'low' ? '✓' : normalized === 'medium' ? '!' : '!'}
        </div>
      </div>
      <div className="risk-gauge">
        <div className="gauge-track">
          <span style={{ width: `${score}%` }}></span>
        </div>
        <div className="gauge-labels">
          <span>Low</span><span>Medium</span><span>High</span>
        </div>
      </div>
      <p>{subtitle}</p>
    </section>
  )
}

export default RiskCard
