import Link from "next/link";

const fitur = [
  { judul: "Lihat koleksi", isi: "Semua buku perpustakaan dalam satu daftar, lengkap dengan sisa stok." },
  { judul: "Cari cepat", isi: "Cari berdasarkan judul atau penulis, lalu saring menurut kategori dan ketersediaan." },
  { judul: "Catat buku baru", isi: "Tambahkan buku ke database lewat form sederhana dengan validasi." },
];

export default function Landing() {
  return (
    <div className="space-y-10">
      <section className="py-6 sm:py-12">
        <h1 className="judul max-w-xl text-4xl font-bold leading-tight text-[var(--ink)] sm:text-5xl">
          Pencatatan buku perpustakaan, tanpa buku catatan.
        </h1>
        <p className="mt-4 max-w-xl text-gray-600">
          PustakaKu menggantikan pencatatan manual di perpustakaan SMA. Petugas bisa melihat koleksi,
          memeriksa stok yang tersisa, dan menambahkan buku baru dari satu tempat.
        </p>
        <Link href="/buku" className="btn mt-6">Lihat Daftar Buku</Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {fitur.map((f) => (
          <div key={f.judul} className="rounded-lg border border-gray-200 bg-white p-4">
            <h2 className="font-semibold">{f.judul}</h2>
            <p className="mt-1 text-sm text-gray-600">{f.isi}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
