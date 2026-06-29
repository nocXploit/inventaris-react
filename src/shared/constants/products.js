// ===== SUMBER DATA TERPUSAT =====
// Semua halaman (Dashboard, Data Produk) import dari sini
// agar angka statistik selalu sinkron dengan isi tabel

export const dataBarang = [
  {
    id: 1,
    kode: "BRG-001",
    nama: "Ginna OG Black",
    kategori: "Denim Pants",
    stok: 12,
    harga: "350.000",
    iconColor: "#60a5fa",
  },
  {
    id: 2,
    kode: "BRG-002",
    nama: "Ginna OG Blue",
    kategori: "Denim Pants",
    stok: 0,
    harga: "450.000",
    iconColor: "#34d399",
  },
  {
    id: 3,
    kode: "BRG-003",
    nama: "T-Shirt Cotton Combed",
    kategori: "Apparel",
    stok: 25,
    harga: "120.000",
    iconColor: "#f472b6",
  },
];

// dihitung otomatis dari data di atas
export const stats = {
  totalProduk: dataBarang.length,
  stokHabis: dataBarang.filter((b) => b.stok === 0).length,
  totalStok: dataBarang.reduce((sum, b) => sum + b.stok, 0),
  totalKategori: [...new Set(dataBarang.map((b) => b.kategori))].length,
};
