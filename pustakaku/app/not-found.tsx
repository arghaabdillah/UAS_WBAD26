import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="judul text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-gray-600">Buku atau alamat yang Anda cari tidak ada.</p>
      <Link href="/buku" className="btn mt-6">Kembali ke daftar buku</Link>
    </div>
  );
}
