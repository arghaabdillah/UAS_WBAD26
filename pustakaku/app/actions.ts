"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KATEGORI } from "@/lib/kategori";

export type FormState = {
  galat?: Partial<Record<"judul" | "penulis" | "kategori" | "tahun" | "stok", string>>;
  pesan?: string;
  values?: Record<string, string>;
};

export async function simpanBuku(_prev: FormState, formData: FormData): Promise<FormState> {
  const ambil = (k: string) => String(formData.get(k) ?? "").trim();
  const values = {
    judul: ambil("judul"), penulis: ambil("penulis"), kategori: ambil("kategori"),
    tahun: ambil("tahun"), stok: ambil("stok"), deskripsi: ambil("deskripsi"),
  };

  // Validasi di server
  const galat: NonNullable<FormState["galat"]> = {};
  if (!values.judul) galat.judul = "Judul wajib diisi";
  if (!values.penulis) galat.penulis = "Penulis wajib diisi";
  if (!KATEGORI.includes(values.kategori)) galat.kategori = "Pilih kategori";
  const tahun = values.tahun === "" ? null : Number(values.tahun);
  if (tahun !== null && (!Number.isInteger(tahun) || tahun < 1000 || tahun > new Date().getFullYear() + 1))
    galat.tahun = "Tahun tidak valid";
  const stok = Number(values.stok);
  if (values.stok === "" || !Number.isInteger(stok) || stok < 0 || stok > 9999)
    galat.stok = "Isi stok dengan angka 0 sampai 9999";
  if (Object.keys(galat).length) return { galat, pesan: "Periksa kembali isian Anda.", values };

  let baru;
  try {
    baru = await prisma.buku.create({
      data: {
        judul: values.judul, penulis: values.penulis, kategori: values.kategori,
        tahun, stokTotal: stok, stokTersedia: stok, deskripsi: values.deskripsi || null,
      },
    });
  } catch {
    return { pesan: "Terjadi kesalahan di server. Coba lagi.", values };
  }
  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`); // di luar try/catch
}

// Stok diubah di dalam transaksi supaya tetap konsisten (0 <= tersedia <= total).
export async function pinjamBuku(id: number) {
  await prisma.$transaction(async (tx) => {
    await tx.buku.updateMany({
      where: { id, stokTersedia: { gt: 0 } },
      data: { stokTersedia: { decrement: 1 } },
    });
  });
  revalidatePath("/buku");
  revalidatePath(`/buku/${id}`);
}

export async function kembalikanBuku(id: number) {
  await prisma.$transaction(async (tx) => {
    const b = await tx.buku.findUnique({ where: { id } });
    if (b && b.stokTersedia < b.stokTotal)
      await tx.buku.update({ where: { id }, data: { stokTersedia: { increment: 1 } } });
  });
  revalidatePath("/buku");
  revalidatePath(`/buku/${id}`);
}
