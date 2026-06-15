import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import InfoCard from "./components/InfoCard";
import ProductTable from "./components/ProductTable";

export default function App() {
  const [dataBarang, setDataBarang] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data loading selama 1.2 detik (Materi Hooks - useEffect)
  useEffect(() => {
    const fetchBarang = setTimeout(() => {
      setDataBarang([
        {
          id: 1,
          kode: "BRG-001",
          nama: "Ginna OG Black",
          kategori: "Denim Pants",
          stok: 12,
          harga: "350.000",
        },
        {
          id: 2,
          kode: "BRG-002",
          nama: "Ginna OG Blue",
          kategori: "Denim Pants",
          stok: 0,
          harga: "450.000",
        },
        {
          id: 3,
          kode: "BRG-003",
          nama: "T-Shirt Cotton Combed 30s",
          kategori: "APPAREL",
          stok: 25,
          harga: "120.000",
        },
      ]);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(fetchBarang);
  }, []);

  // Handle product details (Materi Event Handling)
  const handleCekBarang = (nama) => {
    alert(`Memeriksa detail properti untuk: ${nama}`);
  };

  return (
    <div className="app">
      {/* Memanggil Komponen Modular */}
      <Navbar />
      <main className="main-content">
        <InfoCard />
        {/* Mengirim data lewat PROPS ke komponen */}
        <ProductTable
          data={dataBarang}
          loading={loading}
          onCekBarang={handleCekBarang}
        />
      </main>
    </div>
  );
}