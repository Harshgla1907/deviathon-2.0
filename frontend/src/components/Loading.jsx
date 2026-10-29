function Loading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner"></span>
      <div>
        <strong>Analyzing safety conditions</strong>
        <p>Fetching live data and calculating risk...</p>
      </div>
    </div>
  )
}

export default Loading
