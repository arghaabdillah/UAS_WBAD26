"use client";
import Link from "next/link";
import { useActionState } from "react";
import { simpanBuku, type FormState } from "@/app/actions";
import { KATEGORI } from "@/lib/kategori";

const awal: FormState = {};

function Galat({ teks }: { teks?: string }) {
  return teks ? <p className="mt-1 text-xs text-red-600">{teks}</p> : null;
}

export default function BukuForm() {
  const [state, formAction, pending] = useActionState(simpanBuku, awal);
  const v = state.values;
  const label = "mb-1 block text-sm font-medium";

  return (
    <form action={formAction} className="space-y-4 rounded-lg border border-gray-200 bg-white p-5">
      <h1 className="judul text-2xl font-bold">Tambah buku baru</h1>

      <div>
        <label htmlFor="judul" className={label}>Judul *</label>
        <input id="judul" name="judul" placeholder="Judul buku" defaultValue={v?.judul} className="input" />
        <Galat teks={state.galat?.judul} />
      </div>
      <div>
        <label htmlFor="penulis" className={label}>Penulis *</label>
        <input id="penulis" name="penulis" placeholder="Nama penulis" defaultValue={v?.penulis} className="input" />
        <Galat teks={state.galat?.penulis} />
      </div>
      <div>
        <label htmlFor="kategori" className={label}>Kategori *</label>
        <select id="kategori" name="kategori" defaultValue={v?.kategori ?? ""} className="input">
          <option value="">Pilih kategori</option>
          {KATEGORI.map((k) => <option key={k}>{k}</option>)}
        </select>
        <Galat teks={state.galat?.kategori} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className={label}>Tahun terbit</label>
          <input id="tahun" name="tahun" type="number" placeholder="2005" defaultValue={v?.tahun} className="input" />
          <Galat teks={state.galat?.tahun} />
        </div>
        <div>
          <label htmlFor="stok" className={label}>Jumlah stok *</label>
          <input id="stok" name="stok" type="number" min={0} placeholder="5" defaultValue={v?.stok} className="input" />
          <Galat teks={state.galat?.stok} />
        </div>
      </div>
      <div>
        <label htmlFor="deskripsi" className={label}>Deskripsi</label>
        <textarea id="deskripsi" name="deskripsi" rows={3} placeholder="Deskripsi buku" defaultValue={v?.deskripsi} className="input" />
      </div>

      {state.pesan && <p className="text-sm text-red-600" role="alert">{state.pesan}</p>}

      <div className="flex justify-between">
        <Link href="/buku" className="btn-out">Batal</Link>
        <button type="submit" disabled={pending} className="btn">{pending ? "Menyimpan..." : "Simpan"}</button>
      </div>
    </form>
  );
}
