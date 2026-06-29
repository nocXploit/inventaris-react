import { dataBarang } from "../shared/constants/products";

export default function App() {
  const handleCekBarang = (nama) => {
    alert(`Memeriksa detail properti untuk: ${nama}`);
  };

  const ProductIcon = ({ color = "#60a5fa" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"></path>
    </svg>
  );

  return (
    <div
      style={{
        padding: "0 40px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Total Produk */}
        <div
          style={{
            backgroundColor: "#222222",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "#1e3a8a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <div>
            <div
              style={{
                color: "#6b6b6b",
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
              }}
            >
              Total Produk
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: "700",
                lineHeight: 1,
              }}
            >
              {dataBarang.length}
            </div>
            <div
              style={{ color: "#60a5fa", fontSize: "12px", marginTop: "4px" }}
            >
              item terdaftar
            </div>
          </div>
        </div>

        {/* Stok Habis */}
        <div
          style={{
            backgroundColor: "#222222",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "#3f0f0f",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div>
            <div
              style={{
                color: "#6b6b6b",
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
              }}
            >
              Stok Habis
            </div>
            <div
              style={{
                color: "#ef4444",
                fontSize: "28px",
                fontWeight: "700",
                lineHeight: 1,
              }}
            >
              {dataBarang.filter((b) => b.stok === 0).length}
            </div>
            <div
              style={{ color: "#6b6b6b", fontSize: "12px", marginTop: "4px" }}
            >
              perlu restok
            </div>
          </div>
        </div>

        {/* Total Stok */}
        <div
          style={{
            backgroundColor: "#222222",
            borderRadius: "20px",
            padding: "28px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              backgroundColor: "#052e16",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div>
            <div
              style={{
                color: "#6b6b6b",
                fontSize: "12px",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "6px",
              }}
            >
              Total Stok
            </div>
            <div
              style={{
                color: "#10b981",
                fontSize: "28px",
                fontWeight: "700",
                lineHeight: 1,
              }}
            >
              {dataBarang.reduce((sum, b) => sum + b.stok, 0)}
            </div>
            <div
              style={{ color: "#6b6b6b", fontSize: "12px", marginTop: "4px" }}
            >
              unit tersedia
            </div>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div
        style={{
          backgroundColor: "#222222",
          borderRadius: "24px",
          padding: "30px",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              margin: 0,
            }}
          >
            Daftar Produk Tersedia
          </h3>
          <p style={{ color: "#6b6b6b", fontSize: "13px", margin: 0 }}>
            Update dan pantau stok barang.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px",
                    fontWeight: "600",
                    textAlign: "left",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Kode
                </th>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px",
                    fontWeight: "600",
                    textAlign: "left",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Nama Barang
                </th>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px",
                    fontWeight: "600",
                    textAlign: "left",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Kategori
                </th>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px",
                    fontWeight: "600",
                    textAlign: "center",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Stok
                </th>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px", 
                    fontWeight: "600",
                    textAlign: "right",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Harga
                </th>
                <th
                  style={{
                    color: "#6b6b6b",
                    fontSize: "12px",
                    fontWeight: "600",
                    textAlign: "right",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #333",
                    textTransform: "uppercase",
                  }}
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataBarang.map((item) => (
                <tr
                  key={item.id}
                  style={{ transition: "all 0.2s ease", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2a2a2a")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                      color: "#6b6b6b",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {item.kode}
                  </td>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                      color: "#fff",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontWeight: "500",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "#333",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ProductIcon color={item.iconColor} />
                    </div>
                    {item.nama}
                  </td>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#1e3a8a",
                        color: "#60a5fa",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.kategori}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                      textAlign: "center",
                    }}
                  >
                    {item.stok > 0 ? (
                      <span
                        style={{
                          color: "#10b981",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {item.stok}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#ef4444",
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Habis
                      </span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                      color: "#fff",
                      fontSize: "14px",
                      textAlign: "right",
                      fontWeight: "500",
                    }}
                  >
                    Rp {item.harga}
                  </td>
                  <td
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid #333",
                      textAlign: "right",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCekBarang(item.nama);
                      }}
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2563eb")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3b82f6")
                      }
                    >
                      CEK DETAIL
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
