// Seed otomatis: hanya mengisi data bila tabel masih kosong (aman dijalankan berulang).
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const buku = [
  ["Laskar Pelangi", "Andrea Hirata", "Novel", 2005, 5, 3, "Kisah sepuluh anak di Belitung yang belajar di sekolah reyot dan tetap bermimpi besar."],
  ["Bumi Manusia", "Pramoedya Ananta Toer", "Novel", 1980, 2, 0, "Roman sejarah tentang Minke di masa kolonial. Semua eksemplar sedang dipinjam."],
  ["Fisika Dasar", "David Halliday", "Sains", 2010, 2, 2, "Mekanika, panas, gelombang, dan listrik-magnet untuk pemula."],
  ["Negeri 5 Menara", "Ahmad Fuadi", "Novel", 2009, 4, 2, "Enam santri dari berbagai daerah mengejar mimpi di pondok pesantren."],
  ["Sapiens", "Yuval Noah Harari", "Sejarah", 2011, 3, 3, "Sejarah singkat umat manusia dari zaman batu sampai era modern."],
  ["Matematika Kelas X", "Kemendikbud", "Matematika", 2021, 10, 7, "Buku teks matematika kelas X sesuai kurikulum."],
  ["Biologi", "Neil A. Campbell", "Sains", 2012, 3, 0, "Pengantar biologi sel hingga ekosistem."],
  ["Kamus Besar Bahasa Indonesia", "Badan Bahasa", "Bahasa", 2016, 1, 1, "Rujukan resmi kosakata bahasa Indonesia."],
  ["Sejarah Indonesia Modern", "M. C. Ricklefs", "Sejarah", 2008, 2, 1, null],
  ["Atomic Habits", "James Clear", "Lainnya", 2018, 4, 4, "Cara membangun kebiasaan kecil yang berdampak besar."],
];

async function main() {
  if ((await prisma.buku.count()) > 0) return console.log("Seed dilewati: data sudah ada.");
  await prisma.buku.createMany({
    data: buku.map(([judul, penulis, kategori, tahun, stokTotal, stokTersedia, deskripsi]) => ({
      judul, penulis, kategori, tahun, stokTotal, stokTersedia, deskripsi,
    })),
  });
  console.log(`Seed selesai: ${buku.length} buku ditambahkan.`);
}
main().finally(() => prisma.$disconnect());
