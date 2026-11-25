import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Daftar Buku" };

type Param = string | string[] | undefined;
const ambil = (v: Param) => ((Array.isArray(v) ? v[0] : v) ?? "").trim();

export default async function DaftarBuku({
  searchParams,
}: {
  searchParams: Promise<{ cari?: Param }>;
}) {
  const sp = await searchParams;
  const cari = ambil(sp.cari);

  // Query terparameter lewat Prisma (nilai pencarian tidak pernah digabung ke string SQL)
  const where: Prisma.BukuWhereInput = {
    ...(cari ? { OR: [{ judul: { contains: cari } }, { penulis: { contains: cari } }] } : {}),
  };
  const daftar = await prisma.buku.findMany({ where, orderBy: { judul: "asc" } });

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="judul text-2xl font-bold">Daftar buku</h1>
        <Link href="/buku/baru" className="btn">+ Tambah buku</Link>
      </div>

      <form action="/buku" method="get" className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input name="cari" defaultValue={cari} placeholder="Cari judul atau penulis" aria-label="Cari judul atau penulis" className="input" />
        <button className="btn">Cari</button>
      </form>

      {daftar.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          {cari ? "Tidak ada buku yang cocok. Coba kata kunci lain." : "Belum ada buku. Tambahkan buku pertama."}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-3 py-2 font-medium">No</th>
                <th className="px-3 py-2 font-medium">Judul</th>
                <th className="px-3 py-2 font-medium">Penulis</th>
                <th className="px-3 py-2 font-medium">Kategori</th>
                <th className="px-3 py-2 font-medium">Stok</th>
                <th className="px-3 py-2 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftar.map((b, i) => (
                <tr key={b.id}>
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2 font-medium">{b.judul}</td>
                  <td className="px-3 py-2">{b.penulis}</td>
                  <td className="px-3 py-2">{b.kategori}</td>
                  <td className="px-3 py-2">
                    <span className={b.stokTersedia === 0 ? "rounded bg-red-100 px-2 py-0.5 text-red-700" : ""}>
                      {b.stokTersedia}/{b.stokTotal}
                    </span>
                  </td>
                  <td className="px-3 py-2"><Link href={`/buku/${b.id}`} className="btn-out">Detail</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
