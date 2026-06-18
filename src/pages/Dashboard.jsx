import { useState } from "react";
import { dataBarang, stats } from "../data/products";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const ProductIcon = ({ color = "#60a5fa" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"></path>
    </svg>
  );

  // Map dataBarang to the shape needed for dashboard display
  const products = dataBarang.map((b) => ({
    name: b.nama,
    amount: b.harga,
    date: "Wed 1:00 pm",
    account: b.kategori,
    iconColor: b.iconColor,
    change: b.stok > 0 ? "+" + b.stok + " stok" : "Habis",
  }));

  const team = [
    { name: "Admin", initials: "A", color: "#3b82f6" },
    { name: "Manager", initials: "M", color: "#10b981" },
    { name: "Staff", initials: "S", color: "#f59e0b" },
    { name: "Team", initials: "T", color: "#8b5cf6" },
  ];

  return (
    <div style={{ padding: "0 40px 40px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "24px",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* BLUE CARD (Total Produk) */}
          <div style={{
            backgroundColor: "#3b82f6",
            borderRadius: "24px",
            padding: "30px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "500", margin: "0 0 10px", opacity: 0.9 }}>
              Total Produk
            </h3>
            <div style={{ fontSize: "42px", fontWeight: "700", marginBottom: "10px" }}>
              {stats.totalProduk}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", opacity: 0.9 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              8.2%
            </div>
            {/* Layer belakang, opacity rendah (0.08), gelombang tinggi */}
            <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "90px" }} viewBox="0 0 400 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Layer tengah, opacity sedang (0.13), gelombang medium */}
              <path d="M0,45 C40,20 80,65 120,40 C160,15 200,60 240,38 C280,16 320,55 360,35 C385,22 400,40 400,40 L400,90 L0,90 Z" fill="rgba(255,255,255,0.08)"/>
              {/* Layer depan, opacity tinggi (0.18), gelombang rendah */}
              <path d="M0,55 C50,30 90,70 140,50 C190,30 230,65 280,45 C320,28 360,60 400,48 L400,90 L0,90 Z" fill="rgba(255,255,255,0.13)"/>
              {/* Layer paling depan, opacity paling tinggi (0.18), gelombang paling rendah */}
              <path d="M0,65 C60,45 100,78 160,60 C210,44 250,72 310,55 C345,44 380,65 400,58 L400,90 L0,90 Z" fill="rgba(255,255,255,0.18)"/>
            </svg>
          </div>

          {/* TEAM CARD (Contact style) */}
          <div style={{
            backgroundColor: "#222222",
            borderRadius: "24px",
            padding: "24px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "#fff", fontSize: "18px", margin: 0, fontWeight: "500" }}>Team <span style={{ color: "#6b6b6b", fontSize: "14px" }}>(5)</span></h3>
              <button style={{ background: "#333", color: "#aaa", border: "none", borderRadius: "12px", padding: "4px 12px", fontSize: "12px", cursor: "pointer" }}>Full list</button>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {team.map((m, i) => (
                <div key={i} style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: m.color, display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: "bold", fontSize: "14px", border: "2px solid #222" }}>
                  {m.initials}
                </div>
              ))}
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#3b82f6", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
          </div>

          {/* STOK MENIPIS (Assets style) */}
          <div style={{
            backgroundColor: "#222222",
            borderRadius: "24px",
            padding: "24px",
            flex: 1
          }}>
             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <h3 style={{ color: "#fff", fontSize: "18px", margin: 0, fontWeight: "500" }}>Stok Menipis</h3>
              <div style={{ backgroundColor: "#3b82f6", color: "#fff", borderRadius: "50%", width: "24px", height: "24px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>{stats.stokHabis}</div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               {products.map((p, i) => (
                 <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                       <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#333", display: "flex", justifyContent: "center", alignItems: "center" }}><ProductIcon color={p.iconColor} /></div>
                       <div>
                         <div style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}>{p.name}</div>
                         <div style={{ color: "#6b6b6b", fontSize: "12px" }}>{p.account}</div>
                       </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                       <div style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}>Rp {p.amount}</div>
                       <div style={{ color: p.change.startsWith('+') ? "#10b981" : "#ef4444", fontSize: "12px" }}>{p.change}</div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* WHITE CARD (Total Kategori / Analytics) */}
          <div style={{
            backgroundColor: "#f4f4f5",
            borderRadius: "24px",
            padding: "30px",
            display: "flex",
            gap: "20px",
            justifyContent: "space-between"
          }}>
            <div style={{ flex: 1 }}>
               <h3 style={{ color: "#1a1a1a", fontSize: "22px", fontWeight: "600", margin: "0 0 10px" }}>Total Kategori</h3>
               <p style={{ color: "#6b6b6b", fontSize: "15px", margin: "0 0 30px" }}>Optimize your products</p>
               <div style={{ fontSize: "36px", fontWeight: "700", color: "#1a1a1a" }}>12<span style={{ fontSize: "18px", color: "#6b6b6b", fontWeight: "500" }}> Kategori</span></div>
            </div>
            
            {/* Fake Bar Chart */}
            <div style={{ display: "flex", gap: "15px", alignItems: "flex-end", height: "150px" }}>
               {[40, 20, 60, 80, 100, 70, 30].map((h, i) => (
                 <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <div style={{ color: "#6b6b6b", fontSize: "11px", fontWeight: "500" }}>{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}</div>
                    <div style={{ 
                      width: "36px", 
                      height: `${h}px`, 
                      backgroundColor: i === 4 ? "#3b82f6" : "#bfdbfe", 
                      borderRadius: "8px" 
                    }}></div>
                 </div>
               ))}
            </div>
          </div>

          {/* TABLE (Products) */}
          <div style={{
            backgroundColor: "#222222",
            borderRadius: "24px",
            padding: "24px",
            flex: 1
          }}>
             <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ color: "#6b6b6b", fontSize: "12px", fontWeight: "500", textAlign: "left", paddingBottom: "20px", borderBottom: "1px solid #333" }}># Product</th>
                    <th style={{ color: "#6b6b6b", fontSize: "12px", fontWeight: "500", textAlign: "left", paddingBottom: "20px", borderBottom: "1px solid #333" }}>Category</th>
                    <th style={{ color: "#6b6b6b", fontSize: "12px", fontWeight: "500", textAlign: "left", paddingBottom: "20px", borderBottom: "1px solid #333" }}>Date</th>
                    <th style={{ color: "#6b6b6b", fontSize: "12px", fontWeight: "500", textAlign: "right", paddingBottom: "20px", borderBottom: "1px solid #333" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td style={{ padding: "20px 0", borderBottom: "1px solid #333", color: "#fff", fontSize: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ color: "#6b6b6b", width: "16px" }}>{i + 1}</span>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#333", display: "flex", justifyContent: "center", alignItems: "center" }}><ProductIcon color={p.iconColor} /></div>
                        {p.name}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: "1px solid #333", color: "#aaa", fontSize: "14px" }}>
                        {p.account}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: "1px solid #333", color: "#ef4444", fontSize: "14px" }}>
                        {p.date}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: "1px solid #333", color: "#fff", fontSize: "14px", textAlign: "right" }}>
                        Rp {p.amount}
                      </td>
                    </tr>
                  ))}
                  {/* Duplicate to fill space like image */}
                  {products.map((p, i) => (
                    <tr key={i + 3}>
                      <td style={{ padding: "20px 0", borderBottom: i===2 ? "none" : "1px solid #333", color: "#fff", fontSize: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ color: "#6b6b6b", width: "16px" }}>{i + 4}</span>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#333", display: "flex", justifyContent: "center", alignItems: "center" }}><ProductIcon color={p.iconColor} /></div>
                        {p.name}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: i===2 ? "none" : "1px solid #333", color: "#aaa", fontSize: "14px" }}>
                        {p.account}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: i===2 ? "none" : "1px solid #333", color: "#ef4444", fontSize: "14px" }}>
                        {p.date}
                      </td>
                      <td style={{ padding: "20px 0", borderBottom: i===2 ? "none" : "1px solid #333", color: "#fff", fontSize: "14px", textAlign: "right" }}>
                        Rp {p.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
