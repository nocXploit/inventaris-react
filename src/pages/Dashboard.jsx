import { useState, useEffect } from "react";
import { barangService } from "../shared/api/api";
import { stats } from "../shared/constants/products";

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  /*STATE UNTUK MENAMPUNG DATA DARI SERVER API*/
  const [apiDataBarang, setApiDataBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /*STATE UNTUK FORM TAMBAH & EDIT*/
  const [showFormTambah, setShowFormTambah] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showFormHapus, setShowFormHapus] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingName, setDeletingName] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
    kategori: "",
    stok: "",
  });

  /*FUNGSIONAL RE-FETCH DATA*/
  const fetchBarang = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await barangService.getAll();
      setApiDataBarang(data);
    } catch (err) {
      setError("Gagal mengambil data dari server.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, []);

  /* 1. AKSI TAMBAH BARANG (POST) */
  const handleTambah = () => {
    setFormData({ nama: "", harga: "", kategori: "", stok: "" });
    setShowFormTambah(true);
    setShowFormEdit(false);
  };

  const submitTambahBarang = async () => {
    if (
      !formData.nama ||
      !formData.harga ||
      !formData.kategori ||
      !formData.stok
    ) {
      alert("Semua data wajib diisi!");
      return;
    }

    try {
      await barangService.create({
        nama: formData.nama,
        harga: Number(formData.harga),
        kategori: formData.kategori,
        stok: Number(formData.stok),
      });
      setShowFormTambah(false);
      setFormData({ nama: "", harga: "", kategori: "", stok: "" });
      fetchBarang();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan produk!");
    }
  };

  /* 2. AKSI EDIT BARANG (PUT) */
  const handleEdit = (id, itemSkarang) => {
    setEditingId(id);
    setFormData({
      nama: itemSkarang.nama,
      harga: itemSkarang.harga,
      kategori: itemSkarang.kategori,
      stok: itemSkarang.stok,
    });
    setShowFormEdit(true);
    setShowFormTambah(false);
  };

  const submitEditBarang = async () => {
    if (
      !formData.nama ||
      !formData.harga ||
      !formData.kategori ||
      !formData.stok
    ) {
      alert("Semua data wajib diisi!");
      return;
    }

    try {
      await barangService.update(editingId, {
        nama: formData.nama,
        harga: Number(formData.harga),
        kategori: formData.kategori,
        stok: Number(formData.stok),
      });
      setShowFormEdit(false);
      setEditingId(null);
      setFormData({ nama: "", harga: "", kategori: "", stok: "" });
      fetchBarang();
    } catch (err) {
      console.error(err);
      alert("Gagal mengubah produk!");
    }
  };

  /* 3. AKSI HAPUS BARANG (DELETE) */
  const handleHapus = (id, nama) => {
    setDeletingId(id);
    setDeletingName(nama);
    setShowFormHapus(true);
  };

  const submitHapusBarang = async () => {
    try {
      await barangService.delete(deletingId);
      setShowFormHapus(false);
      setDeletingId(null);
      setDeletingName("");
      fetchBarang();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk!");
    }
  };

  // Mapping bawaan lu tetep utuh, tapi ditambahkan field id asli di return objeknya buat referensi CRUD
  const products = apiDataBarang.map((b) => ({
    id: b.id,
    namaAsli: b.nama,
    hargaAsli: b.harga,
    stokAsli: b.stok,
    name: b.nama,
    amount: b.harga,
    date: "Wed 1:00 pm",
    account: b.kategori,
    iconColor: b.iconColor || "#60a5fa",
    change: b.stok > 0 ? "+" + b.stok + " stok" : "Habis",
  }));

  const team = [
    { name: "Admin", initials: "A", color: "#3b82f6" },
    { name: "Manager", initials: "M", color: "#10b981" },
    { name: "Staff", initials: "S", color: "#f59e0b" },
    { name: "Team", initials: "T", color: "#8b5cf6" },
  ];

  return (
    <div
      style={{
        padding: "0 40px 40px",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* BLUE CARD WAVE (Total Produk) */}
          <div
            style={{
              backgroundColor: "#3b82f6",
              borderRadius: "24px",
              padding: "30px",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "500",
                margin: "0 0 10px",
                opacity: 0.9,
              }}
            >
              Total Produk
            </h3>
            <div
              style={{
                fontSize: "42px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              {stats.totalProduk}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                opacity: 0.9,
              }}
            >
              <svg
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
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              8.2%
            </div>
            <svg
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "90px",
              }}
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,45 C40,20 80,65 120,40 C160,15 200,60 240,38 C280,16 320,55 360,35 C385,22 400,40 400,40 L400,90 L0,90 Z"
                fill="rgba(255,255,255,0.08)"
              />
              <path
                d="M0,55 C50,30 90,70 140,50 C190,30 230,65 280,45 C320,28 360,60 400,48 L400,90 L0,90 Z"
                fill="rgba(255,255,255,0.13)"
              />
              <path
                d="M0,65 C60,45 100,78 160,60 C210,44 250,72 310,55 C345,44 380,65 400,58 L400,90 L0,90 Z"
                fill="rgba(255,255,255,0.18)"
              />
            </svg>
          </div>

          {/* TEAM CARD */}
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "24px",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                Team{" "}
                <span style={{ color: "#6b6b6b", fontSize: "14px" }}>(5)</span>
              </h3>
              <button
                style={{
                  background: "#333",
                  color: "#aaa",
                  border: "none",
                  borderRadius: "12px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Full list
              </button>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {team.map((m, i) => (
                <div
                  key={i}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: m.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "14px",
                    border: "2px solid #222",
                  }}
                >
                  {m.initials}
                </div>
              ))}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          {/* STOK MENIPIS */}
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "24px",
              padding: "24px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  margin: 0,
                  fontWeight: "500",
                }}
              >
                Stok Menipis
              </h3>
              <div
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {stats.stokHabis}
              </div>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {isLoading && (
                <p style={{ color: "#3b82f6", fontSize: "14px" }}>
                  Loading info stok...
                </p>
              )}
              {error && (
                <p style={{ color: "#ef4444", fontSize: "14px" }}>
                  Gagal memuat.
                </p>
              )}

              {!isLoading && !error && products.length === 0 && (
                <p style={{ color: "#6b6b6b", fontSize: "14px" }}>Aman.</p>
              )}

              {!isLoading &&
                !error &&
                products.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#333",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ProductIcon color={p.iconColor} />
                      </div>
                      <div>
                        <div
                          style={{
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {p.name}
                        </div>
                        <div style={{ color: "#6b6b6b", fontSize: "12px" }}>
                          {p.account}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Rp {p.amount}
                      </div>
                      <div
                        style={{
                          color: p.change.startsWith("+")
                            ? "#10b981"
                            : "#ef4444",
                          fontSize: "12px",
                        }}
                      >
                        {p.change}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* WHITE CARD */}
          <div
            style={{
              backgroundColor: "#f4f4f5",
              borderRadius: "24px",
              padding: "30px",
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  color: "#1a1a1a",
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "0 0 10px",
                }}
              >
                Total Kategori
              </h3>
              <p
                style={{
                  color: "#6b6b6b",
                  fontSize: "15px",
                  margin: "0 0 30px",
                }}
              >
                Optimize your products
              </p>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#1a1a1a",
                }}
              >
                12
                <span
                  style={{
                    fontSize: "18px",
                    color: "#6b6b6b",
                    fontWeight: "500",
                  }}
                >
                  {" "}
                  Kategori
                </span>
              </div>
            </div>

            {/* Fake Bar Crat */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "flex-end",
                height: "150px",
              }}
            >
              {[40, 20, 60, 80, 100, 70, 30].map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      color: "#6b6b6b",
                      fontSize: "11px",
                      fontWeight: "500",
                    }}
                  >
                    {["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"][i]}
                  </div>
                  <div
                    style={{
                      width: "36px",
                      height: `${h}px`,
                      backgroundColor: i === 4 ? "#3b82f6" : "#bfdbfe",
                      borderRadius: "8px",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* TABLE (Products) */}
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "24px",
              padding: "24px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "16px", margin: 0 }}>
                Gudang Live Data
              </h3>
              {/* TOMBOL TAMBAH DATA */}
              <button
                onClick={handleTambah}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3b82f6")
                }
              >
                <svg
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Tambah Produk
              </button>
            </div>

            {/* MENGATUR CONDITIONAL RENDERING LIVE DATA DI BAGIAN TABEL */}
            {isLoading && (
              <p style={{ color: "#3b82f6", fontWeight: "500" }}>
                {" "}
                Sedang memuat data barang...
              </p>
            )}
            {error && (
              <p style={{ color: "#ef4444", fontWeight: "500" }}>{error}</p>
            )}
            {!isLoading && !error && products.length === 0 && (
              <p style={{ color: "#6b6b6b", fontStyle: "italic" }}>
                📭 Data gudang live masih kosong.{" "}
              </p>
            )}

            {!isLoading && !error && products.length > 0 && (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        color: "#6b6b6b",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "left",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      # Product
                    </th>
                    <th
                      style={{
                        color: "#6b6b6b",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "left",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      Category
                    </th>
                    <th
                      style={{
                        color: "#6b6b6b",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "left",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        color: "#6b6b6b",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "right",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        color: "#6b6b6b",
                        fontSize: "12px",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #333",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={p.id || i}>
                      <td
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #333",
                          color: "#fff",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span style={{ color: "#6b6b6b", width: "16px" }}>
                          {i + 1}
                        </span>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#333",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ProductIcon color={p.iconColor} />
                        </div>
                        {p.name}
                      </td>
                      <td
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #333",
                          color: "#aaa",
                          fontSize: "14px",
                        }}
                      >
                        {p.account}
                      </td>
                      <td
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #333",
                          color: "#ef4444",
                          fontSize: "14px",
                        }}
                      >
                        {p.date}
                      </td>
                      <td
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #333",
                          color: "#fff",
                          fontSize: "14px",
                          textAlign: "right",
                        }}
                      >
                        Rp {p.amount}
                      </td>
                      {/* KOLOM AKSI EDIT & HAPUS DENGAN SVG */}
                      <td
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #333",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          gap: "12px",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleEdit(p.id || i + 1, {
                              nama: p.namaAsli,
                              harga: p.hargaAsli,
                              kategori: p.account,
                              stok: p.stokAsli,
                            })
                          }
                          title="Edit Produk"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            transition: "0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#333")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleHapus(p.id || i + 1, p.name)}
                          title="Hapus Produk"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            transition: "0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#333")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = "transparent")
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MODAL FORM TAMBAH BARANG */}
      {showFormTambah && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "16px",
              padding: "30px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Tambah Produk Baru
              </h2>
              <button
                onClick={() => setShowFormTambah(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  placeholder="Masukkan nama produk"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Harga Produk (Rp)
                </label>
                <input
                  type="number"
                  value={formData.harga}
                  onChange={(e) =>
                    setFormData({ ...formData, harga: e.target.value })
                  }
                  placeholder="Masukkan harga"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  placeholder="Masukkan kategori"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Stok
                </label>
                <input
                  type="number"
                  value={formData.stok}
                  onChange={(e) =>
                    setFormData({ ...formData, stok: e.target.value })
                  }
                  placeholder="Masukkan jumlah stok"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => setShowFormTambah(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#333",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#aaa",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#444";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.color = "#aaa";
                }}
              >
                Batal
              </button>
              <button
                onClick={submitTambahBarang}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3b82f6")
                }
              >
                <svg
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM EDIT BARANG */}
      {showFormEdit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "16px",
              padding: "30px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Produk
              </h2>
              <button
                onClick={() => setShowFormEdit(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  placeholder="Masukkan nama produk"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Harga Produk (Rp)
                </label>
                <input
                  type="number"
                  value={formData.harga}
                  onChange={(e) =>
                    setFormData({ ...formData, harga: e.target.value })
                  }
                  placeholder="Masukkan harga"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) =>
                    setFormData({ ...formData, kategori: e.target.value })
                  }
                  placeholder="Masukkan kategori"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    color: "#aaa",
                    fontSize: "12px",
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "500",
                  }}
                >
                  Stok
                </label>
                <input
                  type="number"
                  value={formData.stok}
                  onChange={(e) =>
                    setFormData({ ...formData, stok: e.target.value })
                  }
                  placeholder="Masukkan jumlah stok"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#333",
                    border: "1px solid #444",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={() => setShowFormEdit(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#333",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#aaa",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#444";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.color = "#aaa";
                }}
              >
                Batal
              </button>
              <button
                onClick={submitEditBarang}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#3b82f6",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#2563eb")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#3b82f6")
                }
              >
                <svg
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
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRM HAPUS BARANG */}
      {showFormHapus && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#222222",
              borderRadius: "16px",
              padding: "30px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Hapus Produk
              </h2>
              <button
                onClick={() => setShowFormHapus(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  cursor: "pointer",
                  fontSize: "24px",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "14px",
                  margin: "0 0 12px 0",
                  lineHeight: "1.5",
                }}
              >
                Anda yakin ingin menghapus produk ini?
              </p>
              <div
                style={{
                  backgroundColor: "#333",
                  padding: "12px",
                  borderRadius: "8px",
                  borderLeft: "3px solid #ef4444",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    margin: 0,
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {deletingName}
                </p>
              </div>
            </div>

            <p
              style={{
                color: "#888",
                fontSize: "12px",
                margin: "0 0 24px 0",
                fontStyle: "italic",
              }}
            >
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowFormHapus(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#333",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#444";
                  e.target.style.borderColor = "#555";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#333";
                  e.target.style.borderColor = "#444";
                }}
              >
                Batal
              </button>
              <button
                onClick={submitHapusBarang}
                style={{
                  flex: 1,
                  padding: "10px",
                  backgroundColor: "#ef4444",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#dc2626")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#ef4444")
                }
              >
                <svg
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
                  <polyline points="3 6 5 4 21 4"></polyline>
                  <path d="M19 4v20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4m3 0V2h8v2M10 9v10M14 9v10"></path>
                </svg>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WATERMARK HEHE */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "40px",
          color: "#333333",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "1px",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        DEVELOPED BY: NOVA LINO HARDIAN PRATAMA
      </div>
    </div>
  );
}
