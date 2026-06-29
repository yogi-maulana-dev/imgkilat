import type { Locale } from "@/i18n/config";

export interface BlogSection {
  heading: string;
  /** Paragraphs and/or bullets ("- " prefix). Rendered by ContentSections. */
  body: string[];
}

export interface BlogContent {
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  sections: BlogSection[];
}

export interface BlogPost {
  slug: string;
  date: string; // ISO
  icon: string; // lucide name (via ToolIcon)
  relatedTools: string[];
  content: Record<Locale, BlogContent>;
}

export const posts: BlogPost[] = [
  {
    slug: "ukuran-foto-cpns",
    date: "2026-06-24",
    icon: "IdCard",
    relatedTools: ["resize-image-to-100kb", "passport-photo-resizer", "compress-image"],
    content: {
      id: {
        title: "Panduan Ukuran Foto untuk Daftar CPNS",
        excerpt:
          "Ukuran, dimensi, dan format pas foto yang benar untuk pendaftaran CPNS — beserta cara cepat mengubahnya agar lolos unggah SSCASN.",
        metaTitle: "Ukuran Foto CPNS yang Benar – Panduan Lengkap + Cara Resize",
        metaDescription:
          "Panduan ukuran foto untuk daftar CPNS: dimensi pas foto, batas ukuran file (KB), dan format. Pelajari cara resize & kompres foto agar lolos unggah SSCASN.",
        keywords: ["ukuran foto cpns", "foto cpns", "pas foto cpns", "resize foto cpns", "ukuran pas foto cpns sscasn"],
        sections: [
          {
            heading: "Ketentuan foto untuk daftar CPNS",
            body: [
              "Saat mendaftar CPNS melalui SSCASN, pelamar wajib mengunggah pas foto dan dokumen dengan ukuran file dan format tertentu. Berkas yang terlalu besar akan ditolak sistem, sehingga banyak pelamar gagal di tahap unggah.",
              "Secara umum, ketentuan yang sering diminta adalah:",
              "- Pas foto latar belakang merah, menghadap depan.",
              "- Format file JPG/JPEG.",
              "- Ukuran file pas foto biasanya maksimal 200 KB (sebagian instansi 100 KB).",
              "- Dokumen seperti KTP dan ijazah dalam format JPG/PDF dengan batas ukuran tersendiri.",
              "Selalu cek pengumuman resmi instansi yang Anda lamar, karena angka pastinya bisa berbeda.",
            ],
          },
          {
            heading: "Cara mengubah ukuran foto CPNS dengan cepat",
            body: [
              "Daripada menebak-nebak tingkat kualitas, gunakan alat yang langsung menargetkan ukuran file. Berikut langkah praktisnya:",
              "- Buka alat Ubah Ukuran ke 100KB atau alat Kompres, lalu unggah pas foto Anda.",
              "- Masukkan target ukuran sesuai ketentuan (misalnya 100 KB atau 200 KB).",
              "- Sistem otomatis mencari kualitas tertinggi yang tetap di bawah target.",
              "- Unduh hasilnya yang dijamin di bawah batas ukuran.",
              "Jika dimensinya juga harus pas, atur lebar dan tinggi terlebih dahulu memakai alat Ubah Ukuran, baru kompres ke target KB.",
            ],
          },
          {
            heading: "Tips agar foto tidak buram saat diperkecil",
            body: [
              "Jika foto menjadi buram setelah dikompres ke ukuran kecil, perkecil dulu dimensinya (misalnya ke 480×640 px) sebelum menargetkan ukuran KB. Dimensi yang lebih kecil membuat anggaran 100–200 KB jauh lebih lega sehingga foto tetap tajam.",
              "Pastikan juga foto asli sudah terang dan fokus, karena kompresi tidak bisa memperbaiki foto yang sejak awal gelap atau goyang.",
            ],
          },
        ],
      },
      en: {
        title: "Photo Size Guide for Civil Service (CPNS) Registration",
        excerpt:
          "The correct dimensions, file size and format for Indonesian civil service (CPNS) photos — and how to resize them to pass the upload.",
        metaTitle: "CPNS Photo Size Guide – Correct Dimensions & How to Resize",
        metaDescription:
          "Guide to photo requirements for CPNS registration: dimensions, file size limits (KB) and format, plus how to resize and compress your photo to pass the upload.",
        keywords: ["cpns photo size", "civil service photo size", "resize cpns photo", "indonesia government job photo"],
        sections: [
          {
            heading: "Photo requirements for CPNS registration",
            body: [
              "When registering for Indonesia's civil service (CPNS) via the SSCASN portal, applicants must upload a passport-style photo and documents at a specific file size and format. Oversized files are rejected, so many applicants get stuck at the upload step.",
              "- Red background, front-facing portrait.",
              "- JPG/JPEG file format.",
              "- Photo file size usually capped at 200 KB (some agencies 100 KB).",
              "- ID and certificates in JPG/PDF with their own size limits.",
              "Always check the official announcement of the agency you are applying to, as exact numbers vary.",
            ],
          },
          {
            heading: "How to resize a CPNS photo quickly",
            body: [
              "Instead of guessing a quality level, use a tool that targets the file size directly.",
              "- Open the Resize to 100KB or Compress tool and upload your photo.",
              "- Enter the required target size (e.g. 100 KB or 200 KB).",
              "- The tool finds the highest quality that stays under the target.",
              "- Download a file guaranteed to be under the limit.",
            ],
          },
          {
            heading: "Keep the photo sharp when shrinking",
            body: [
              "If the photo looks soft after compressing, reduce the dimensions first (e.g. to 480×640 px) before targeting a KB size. Fewer pixels make the 100–200 KB budget stretch much further.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "foto-lamaran-kerja",
    date: "2026-06-22",
    icon: "FileDown",
    relatedTools: ["compress-image", "resize-image", "passport-photo-resizer"],
    content: {
      id: {
        title: "Ukuran dan Format Foto untuk Melamar Kerja",
        excerpt:
          "Ukuran pas foto 3x4 dan 4x6, format file, dan batas ukuran yang umum diminta saat melamar kerja — plus cara menyesuaikannya online.",
        metaTitle: "Ukuran Foto Lamaran Kerja (3x4 & 4x6) + Cara Mengubahnya",
        metaDescription:
          "Panduan ukuran foto lamaran kerja: dimensi pas foto 3x4 dan 4x6, format JPG, dan batas ukuran file. Pelajari cara resize dan kompres foto lamaran secara online.",
        keywords: ["ukuran foto lamaran kerja", "pas foto 3x4", "pas foto 4x6", "foto lamaran kerja", "ukuran pas foto"],
        sections: [
          {
            heading: "Ukuran pas foto yang umum diminta",
            body: [
              "Lamaran kerja, baik cetak maupun online, biasanya meminta pas foto dengan ukuran standar. Yang paling sering dipakai:",
              "- 3×4 cm — paling umum untuk berkas lamaran dan CV.",
              "- 4×6 cm — untuk dokumen resmi tertentu.",
              "- 2×3 cm — kadang diminta untuk formulir.",
              "Untuk lamaran online, file biasanya harus JPG dengan batas ukuran tertentu (sering 100–500 KB).",
            ],
          },
          {
            heading: "Dimensi piksel untuk cetak 300 DPI",
            body: [
              "Agar tajam saat dicetak, gunakan resolusi 300 DPI. Perkiraan dimensi pikselnya:",
              "- 3×4 cm ≈ 354×472 px.",
              "- 4×6 cm ≈ 472×709 px.",
              "Masukkan angka ini pada alat Ubah Ukuran, kunci rasio aspek agar foto tidak gepeng, lalu unduh.",
            ],
          },
          {
            heading: "Menyesuaikan ukuran file untuk unggah online",
            body: [
              "Jika portal lowongan membatasi ukuran file, gunakan alat Kompres dan masukkan target ukuran (misalnya 200 KB). Alat akan mencari kualitas terbaik yang muat. Anda bisa melihat ukuran asli foto dan langsung menggantinya ke target yang diinginkan.",
            ],
          },
        ],
      },
      en: {
        title: "Photo Size & Format for Job Applications",
        excerpt:
          "Standard 3x4 and 4x6 photo sizes, file format and common size limits for job applications — and how to adjust them online.",
        metaTitle: "Job Application Photo Size (3x4 & 4x6) + How to Resize",
        metaDescription:
          "Guide to job application photo size: 3x4 and 4x6 dimensions, JPG format and file size limits, plus how to resize and compress your photo online.",
        keywords: ["job application photo size", "3x4 photo", "4x6 photo", "resume photo size", "passport photo size"],
        sections: [
          {
            heading: "Common photo sizes requested",
            body: [
              "Job applications, printed or online, usually ask for a standard photo size:",
              "- 3×4 cm — most common for application files and CVs.",
              "- 4×6 cm — for certain official documents.",
              "Online applications usually require JPG with a size limit (often 100–500 KB).",
            ],
          },
          {
            heading: "Pixel dimensions at 300 DPI",
            body: [
              "For sharp prints, use 300 DPI:",
              "- 3×4 cm ≈ 354×472 px.",
              "- 4×6 cm ≈ 472×709 px.",
              "Enter these in the Resize tool, lock the aspect ratio, and download.",
            ],
          },
          {
            heading: "Fitting the file size for online upload",
            body: [
              "If a job portal limits the file size, use the Compress tool and enter a target size (e.g. 200 KB). It finds the best quality that fits — and you can see the original size and edit it down directly.",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "ubah-background-foto",
    date: "2026-06-20",
    icon: "Crop",
    relatedTools: ["crop-image", "resize-image", "compress-image"],
    content: {
      id: {
        title: "Cara Mengubah Background Foto Online",
        excerpt:
          "Mengapa foto formal butuh latar merah atau biru, cara mengganti background, lalu memotong dan menyesuaikan ukurannya agar siap diunggah.",
        metaTitle: "Cara Mengubah Background Foto Online (Merah/Biru) + Resize",
        metaDescription:
          "Panduan mengubah background foto menjadi merah atau biru untuk pas foto resmi, lalu memotong dan menyesuaikan ukuran file agar siap diunggah secara online.",
        keywords: ["ubah background foto", "ganti background foto", "background pas foto merah", "edit background foto online"],
        sections: [
          {
            heading: "Kenapa background foto harus diganti?",
            body: [
              "Banyak dokumen resmi — pas foto CPNS, lamaran kerja, ijazah, hingga visa — mewajibkan latar belakang dengan warna tertentu, paling sering merah atau biru polos. Foto dengan latar berantakan biasanya ditolak.",
              "Warna latar kadang juga menandakan tahun kelahiran (ganjil/genap), jadi pastikan Anda memakai warna yang diminta instansi.",
            ],
          },
          {
            heading: "Langkah mengganti background dan merapikan foto",
            body: [
              "Alur yang praktis dan rapi:",
              "- Ambil foto dengan latar polos dan pencahayaan merata agar mudah diproses.",
              "- Ganti warna latar menjadi merah atau biru sesuai ketentuan menggunakan editor foto atau alat penghapus background.",
              "- Setelah latar sesuai, gunakan alat Potong untuk membingkai wajah pada rasio pas foto (mis. 3:4).",
              "- Atur dimensi akhir lewat alat Ubah Ukuran, lalu Kompres ke batas ukuran file yang diminta.",
            ],
          },
          {
            heading: "Siapkan foto agar lolos unggah",
            body: [
              "Setelah background dan bingkai sesuai, sebagian besar kegagalan unggah disebabkan ukuran file. Gunakan alat Kompres dengan target KB (misalnya 100 KB atau 200 KB) — Anda dapat melihat ukuran file asli dan langsung mengeditnya ke ukuran yang diminta.",
            ],
          },
        ],
      },
      en: {
        title: "How to Change a Photo Background Online",
        excerpt:
          "Why formal photos need a red or blue background, how to change it, then crop and resize the result so it's ready to upload.",
        metaTitle: "How to Change a Photo Background Online (Red/Blue) + Resize",
        metaDescription:
          "Guide to changing a photo background to red or blue for official ID photos, then cropping and adjusting the file size so it's ready to upload online.",
        keywords: ["change photo background", "edit photo background online", "red background id photo", "blue background photo"],
        sections: [
          {
            heading: "Why change a photo background?",
            body: [
              "Many official documents — ID photos, job applications, visas — require a solid background colour, most often red or blue. Photos with a busy background get rejected.",
            ],
          },
          {
            heading: "Steps to change the background and tidy the photo",
            body: [
              "- Take the photo against a plain, evenly lit background so it is easy to process.",
              "- Replace the background colour with red or blue using a photo editor or background remover.",
              "- Use the Crop tool to frame the face at an ID ratio (e.g. 3:4).",
              "- Set the final dimensions with the Resize tool, then Compress to the required file size.",
            ],
          },
          {
            heading: "Prepare the photo to pass the upload",
            body: [
              "Once the background and framing are right, most upload failures come down to file size. Use the Compress tool with a KB target — you can see the original size and edit it down directly.",
            ],
          },
        ],
      },
    },
  },
];

export function getPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}
