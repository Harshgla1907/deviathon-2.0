function Loading() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner"></span>
      <div>
        <strong>Checking Mom’s health signals</strong>
        <p>Combining vitals, medicines and recent notes...</p>
      </div>
    </div>
  )
}

export default Loading
