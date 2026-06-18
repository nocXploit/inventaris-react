import LoadingSpinner from "./LoadingSpinner";

export default function ProductTable({ data, loading, onCekBarang }) {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="header-content">
          <h3 className="table-title">Daftar Produk Tersedia</h3>
          <p className="table-subtitle">
            Update dan pantau stok disini.  
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>KODE</th>
              <th>NAMA BARANG</th>
              <th>KATEGORI</th>
              <th>STOK</th>
              <th>HARGA</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="code-cell">{item.kode}</td>
                <td className="name-cell">{item.nama}</td>
                <td>
                  <span className="category-badge">{item.kategori}</span>
                </td>
                <td>
                  <span
                    className="stock-cell"
                    style={item.stok === 0 ? { color: "#ef4444" } : {}}
                  >
                    {item.stok === 0 ? "Habis" : item.stok}
                  </span>
                </td>
                <td className="price-cell">Rp {item.harga}</td>
                <td className="action-cell">
                  <button
                    onClick={() => onCekBarang(item.nama)}
                    className="btn-action"
                  >
                    Cek Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
