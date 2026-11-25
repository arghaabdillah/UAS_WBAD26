import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pinjamBuku, kembalikanBuku } from "@/app/actions";

export default async function DetailBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();
  const b = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!b) notFound();

  const habis = b.stokTersedia === 0;

  return (
    <section>
      <Link href="/buku" className="text-sm text-[var(--accent)] underline">&lsaquo; Kembali ke daftar</Link>
      <div className="mt-4 grid gap-6 rounded-lg border border-gray-200 bg-white p-5 sm:grid-cols-[160px_1fr]">
        <div className="flex aspect-[3/4] items-center justify-center rounded bg-gray-100 text-sm text-gray-400">Sampul</div>
        <div>
          <h1 className="judul text-2xl font-bold">{b.judul}</h1>
          <dl className="mt-3 space-y-1 text-sm">
            <div><dt className="inline text-gray-500">Penulis: </dt><dd className="inline">{b.penulis}</dd></div>
            <div><dt className="inline text-gray-500">Kategori: </dt><dd className="inline">{b.kategori}{b.tahun ? ` · Tahun: ${b.tahun}` : ""}</dd></div>
            <div>
              <dt className="inline text-gray-500">Stok: </dt>
              <dd className={`inline rounded px-2 py-0.5 ${habis ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800"}`}>
                {habis ? "Habis" : `${b.stokTersedia} dari ${b.stokTotal} tersedia`}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-gray-700">{b.deskripsi || "Belum ada deskripsi untuk buku ini."}</p>

          <div className="mt-6 flex gap-2">
            <form action={pinjamBuku.bind(null, b.id)}>
              <button className="btn" disabled={habis}>Pinjam</button>
            </form>
            <form action={kembalikanBuku.bind(null, b.id)}>
              <button className="btn-out" disabled={b.stokTersedia >= b.stokTotal}>Kembalikan</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
