export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div>
            <h1 className="navbar-title">THRIFT SECOND</h1>
            <p className="navbar-subtitle">
              Streetwear second hand.
            </p>
          </div>
        </div>
        <div className="navbar-stats">
          <div className="stat-item">
            <span className="stat-label">Total Items</span>
            <span className="stat-value">37</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">In Stock</span>
            <span className="stat-value">37</span>
          </div>
        </div>
      </div>
    </header>
  );
}
