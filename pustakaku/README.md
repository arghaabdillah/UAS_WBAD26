# PustakaKu

Aplikasi web pencatatan buku perpustakaan SMA (UAS Web Application Development, Prasetiya Mulya, Semester Ganjil 2026-1).

**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma 6 + SQLite + Server Actions, sesuai tutorial di kelas.

## Cara menjalankan

Prasyarat: Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Pastikan file `.env` tersedia (salin `.env.example` sebagai template), lalu `npm run dev` akan otomatis menjalankan migrasi (`prisma migrate deploy`) dan seed data awal. Database SQLite tersimpan di `prisma/dev.db`.

Perintah lain: `npm run build`, `npm run start`, `npm run db:studio` (lihat isi database), `npm run db:seed`.

## Halaman

| Rute | Isi |
|---|---|
| `/` | Landing page + tombol ke Daftar Buku |
| `/buku` | Tabel buku, pencarian judul/penulis, filter kategori dan stok, tombol Tambah buku dan Detail. Stok merah bila 0 |
| `/buku/[id]` | Detail buku, badge stok, tombol Pinjam dan Kembalikan |
| `/buku/baru` | Form tambah buku dengan validasi |

Navbar bersama ada di `app/layout.tsx`. Halaman `not-found.tsx` dan `loading.tsx` tersedia; ID yang tidak valid atau tidak ada menampilkan 404.

## Struktur

```
app/            layout, rute, server actions (actions.ts)
components/     Navbar (client), BukuForm (client)
lib/            prisma.ts (koneksi tunggal), kategori.ts
prisma/         schema.prisma, migrations/, seed.js
```

## Database

Tabel `Buku`: id, judul, penulis, kategori, tahun (opsional), stokTotal, stokTersedia, deskripsi (opsional), createdAt. Seed berisi 10 buku dengan variasi stok (penuh, sebagian, habis) dan kategori; seed dilewati bila tabel sudah berisi. Semua query lewat Prisma Client sehingga nilai input terikat sebagai parameter. Pinjam dan Kembalikan memakai `$transaction` supaya stok tetap di antara 0 dan stokTotal.

## Catatan

Fitur Pinjam/Kembalikan adalah tambahan kecil di halaman detail untuk memperlihatkan stok yang konsisten; tidak mengubah struktur mockup.
