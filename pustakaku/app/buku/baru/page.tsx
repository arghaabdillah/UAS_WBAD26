import BukuForm from "@/components/BukuForm";

export const metadata = { title: "Tambah Buku" };

export default function BukuBaru() {
  return (
    <div className="mx-auto max-w-xl">
      <BukuForm />
    </div>
  );
}
