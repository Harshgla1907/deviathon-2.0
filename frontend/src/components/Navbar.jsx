function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
            <path d="M9.3 12.2h5.4M12 9.5v5.4" />
          </svg>
        </div>
        <div>
          <strong>SafeHome AI</strong>
          <span>Family Care</span>
        </div>
      </div>
      <div className="nav-status">
        <span className="live-dot"></span>
        System Online
      </div>
      <button className="profile-button" aria-label="Open family profile">
        <span>RK</span>
      </button>
    </nav>
  )
}

export default Navbar
