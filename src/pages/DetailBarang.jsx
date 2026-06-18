import { useParams, Link } from 'react-router-dom';

export default function DetailBarang() {
    // Mengambil ID dari URL browser
    const { id } = useParams();

    const detailProduk = {
        id: id,
        nama: id === '1' ? "Ginna OG Black" : "By Thanksinsomnia",
        stok: id === '1' ? 12 : 25,
        harga: id === '1' ? "Rp 350.000" : "Rp 500.000",
        deskripsi: `Kualitas barang nomor satu untuk ID #${id}, dikelola oleh Admin.`
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h1>Detail Properti Barang #{detailProduk.id}</h1>
            <hr style={{ margin: '15px 0', borderColor: '#f1f5f9' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '16px', marginBottom: '20px' }}>
                <p><strong>Nama Barang:</strong> {detailProduk.nama}</p>
                <p><strong>Harga:</strong> {detailProduk.harga}</p>
                <p><strong>Stok:</strong> {detailProduk.stok} pcs</p>
                <p><strong>Deskripsi:</strong> {detailProduk.deskripsi}</p>
            </div>
         
            <Link to="/dashboard/produk" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: '600' }}>
                ⬅️ Kembali ke Data Produk
            </Link>
        </div>
    );
}