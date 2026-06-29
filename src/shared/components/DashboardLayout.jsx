import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const navLinks = [
    {
      name: "Home",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1"></rect>
        </svg>
      ),
    },
    {
      name: "Produk",
      path: "/dashboard/produk",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000000", // Full black outer edge
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Inter', -apple-system, sans-serif",
        zIndex: 9999,
      }}
    >
      {/* INNER APP CONTAINER */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#161616", // Dark inner bg
          borderRadius: "32px",
          display: "flex",
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* SIDEBAR (SLIM) */}
        <aside
          style={{
            width: "80px",
            backgroundColor: "#161616",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 0",
            borderRight: "1px solid #2a2a2a",
          }}
        >
          {/* LOGO */}
          <div style={{ marginBottom: "50px", cursor: "pointer" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#3b82f6" />
              <path
                d="M12 12a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4zm-8 8a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z"
                fill="#161616"
              />
            </svg>
          </div>

          {/* NAV LINKS */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              flex: 1,
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  title={link.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: isActive ? "#ffffff" : "#6b6b6b",
                    backgroundColor: isActive ? "#3b82f6" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#6b6b6b";
                  }}
                >
                  {link.icon}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: "none",
              border: "none",
              color: "#6b6b6b",
              cursor: "pointer",
              padding: "12px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4d4d")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* HEADER */}
          <header
            style={{
              padding: "30px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* SEARCH BAR */}
            <div style={{ position: "relative", width: "300px" }}>
              <svg
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6b6b6b",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search here"
                style={{
                  width: "100%",
                  backgroundColor: "#222222",
                  border: "none",
                  borderRadius: "20px",
                  padding: "12px 16px 12px 40px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* PROFILE / ACTIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b6b6b",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6b6b6b",
                  cursor: "pointer",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </button>
              <div style={{ textAlign: "right", marginLeft: "10px" }}>
                <div
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "600" }}
                >
                  Hi, Admin
                </div>
                <div style={{ color: "#6b6b6b", fontSize: "12px" }}>
                  Today, 18 June 2026
                </div>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                A
              </div>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto" }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
