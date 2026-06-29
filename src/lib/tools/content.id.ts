import type { ToolContent } from "./index";

export const contentId: Record<string, ToolContent> = {
  "resize-image": {
    h1: "Ubah Ukuran Gambar Online",
    navLabel: "Ubah Ukuran",
    metaTitle: "Ubah Ukuran Gambar Online – Resize Foto JPG, PNG, WebP Gratis",
    metaDescription:
      "Ubah ukuran gambar online gratis. Ganti dimensi gambar berdasarkan piksel atau persen sambil mempertahankan rasio aspek. Mendukung JPG, PNG, dan WebP. Cepat & privat.",
    keywords: ["ubah ukuran gambar", "resize gambar", "resize foto online", "ganti ukuran gambar", "ubah ukuran foto", "resize jpg"],
    intro:
      "Ubah dimensi gambar JPG, PNG, atau WebP dalam hitungan detik. Resize berdasarkan piksel atau persen, kunci rasio aspek, dan lihat pratinjau sebelum mengunduh.",
    content: [
      {
        heading: "Cara mengubah ukuran gambar",
        body: [
          "Mengubah ukuran gambar berarti mengganti lebar dan tingginya dalam piksel. Dengan ImgKilat Anda bisa melakukannya langsung di browser — letakkan file ke kotak unggah, ketik lebar atau tinggi baru, lalu unduh hasilnya. Tidak perlu instal aplikasi dan tidak perlu membuat akun.",
          "- Unggah file JPG, PNG, atau WebP (maksimal 20 MB).",
          "- Masukkan lebar dan tinggi target dalam piksel, atau alihkan ke mode persen untuk menskalakan dengan rasio.",
          "- Biarkan ikon kunci aktif agar rasio aspek asli terjaga sehingga foto tidak gepeng.",
          "- Lihat pratinjau dimensi dan perkiraan ukuran file baru, lalu klik unduh.",
        ],
      },
      {
        heading: "Resize berdasarkan piksel atau persen",
        body: [
          "Mode piksel cocok saat Anda butuh ukuran yang pasti — misalnya 1080×1080 untuk Instagram, banner 1920×1080, atau gambar blog selebar 600px. Mode persen sempurna saat Anda hanya ingin foto 50% lebih kecil tanpa repot menghitung.",
          "Karena proses resize dijalankan dengan mesin resampling berkualitas tinggi di server (didukung Sharp), tepi gambar tetap tajam dan teks tetap terbaca bahkan setelah pengecilan besar. Memperbesar juga didukung, meski memperbesar melebihi resolusi asli bisa membuat gambar sedikit buram — ini berlaku untuk semua alat resize.",
        ],
      },
      {
        heading: "Mengapa perlu mengubah ukuran gambar?",
        body: [
          "Gambar berukuran besar adalah penyebab utama halaman web lambat. Foto langsung dari kamera ponsel bisa selebar 4000 piksel dan beberapa megabita — jauh lebih besar daripada yang ditampilkan situs mana pun. Mengubah ukuran ke ukuran tampilan asli sangat mengurangi waktu muat, meningkatkan Core Web Vitals, dan menghemat bandwidth pengunjung.",
          "Resize juga dibutuhkan untuk banyak keperluan praktis: foto profil dengan dimensi maksimal, listing marketplace, lampiran email dengan batas ukuran, dan cetak pada resolusi tertentu. ImgKilat menangani semuanya tanpa watermark atau batasan.",
        ],
      },
      {
        heading: "Privat dan aman secara desain",
        body: [
          "Gambar Anda diproses dalam permintaan terisolasi dan tidak pernah disimpan. File hanya disimpan di memori selama proses resize berlangsung, lalu langsung dihapus — tidak ada yang ditulis ke disk atau dibagikan. Kami memvalidasi tanda tangan file asli saat diunggah, menerapkan batas ukuran ketat, dan membatasi penyalahgunaan.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah alat ubah ukuran gambar ini gratis?", a: "Ya. ImgKilat sepenuhnya gratis tanpa watermark, tanpa daftar, dan tanpa batas pemakaian untuk penggunaan normal." },
      { q: "Apakah resize menurunkan kualitas gambar?", a: "Memperkecil gambar tetap menjaga ketajamannya. Memperbesar melebihi resolusi asli bisa menambah keburaman, yang tidak terhindarkan pada alat mana pun." },
      { q: "Bagaimana cara menjaga rasio aspek?", a: "Biarkan ikon kunci aktif. Saat Anda mengubah lebar, tinggi menyesuaikan otomatis (dan sebaliknya) sehingga foto tidak gepeng." },
      { q: "Format file apa saja yang didukung?", a: "Anda bisa mengubah ukuran gambar JPG/JPEG, PNG, dan WebP, serta mengekspor ke salah satu format tersebut." },
      { q: "Apakah gambar yang diunggah disimpan?", a: "Tidak. File diproses di memori dan dihapus segera setelah respons dikirim. Tidak ada yang disimpan." },
    ],
  },
  "compress-image": {
    h1: "Kompres Gambar Online",
    navLabel: "Kompres",
    metaTitle: "Kompres Gambar Online – Perkecil Ukuran File JPG, PNG & WebP",
    metaDescription:
      "Kompres gambar JPG, PNG, dan WebP online untuk memperkecil ukuran file tanpa banyak mengurangi kualitas. Pakai slider kualitas atau tentukan ukuran target. Gratis & cepat.",
    keywords: ["kompres gambar", "perkecil ukuran gambar", "kompres foto", "compress jpg", "perkecil ukuran foto", "kompres png"],
    intro:
      "Perkecil ukuran file gambar tanpa penurunan kualitas yang terlihat. Gunakan slider kualitas untuk kontrol presisi, atau tentukan ukuran target dan biarkan ImgKilat mencari kualitas terbaik yang muat.",
    content: [
      {
        heading: "Cara mengompres gambar",
        body: [
          "Kompresi mengurangi jumlah byte yang dipakai gambar sambil menjaganya tetap mirip aslinya secara visual. Unggah foto Anda, pilih seberapa agresif kompresinya, lalu unduh file yang jauh lebih kecil.",
          "- Seret JPG, PNG, atau WebP ke area unggah.",
          "- Geser slider kualitas — makin tinggi makin bagus dan makin besar filenya; makin rendah makin kecil filenya.",
          "- Atau alihkan ke mode ukuran target dan ketik ukuran seperti 200 KB; aplikasi mencari kualitas tertinggi yang muat.",
          "- Bandingkan ukuran sebelum dan sesudah, lalu unduh.",
        ],
      },
      {
        heading: "Slider kualitas vs ukuran target",
        body: [
          "Slider kualitas memberi kontrol langsung dan dapat diprediksi, cocok saat Anda tahu kira-kira kompromi yang diinginkan. Sebagian besar foto terlihat sangat baik pada kualitas 70–80% sambil menjadi jauh lebih kecil dari ukuran aslinya.",
          "Mode ukuran target lebih cerdas saat sebuah platform menerapkan batas keras — misalnya formulir unggah yang menolak file di atas 1 MB. ImgKilat menjalankan pencarian biner di berbagai tingkat kualitas agar mendarat tepat di bawah target Anda, jadi Anda otomatis mendapat gambar terbaik pada ukuran tersebut.",
        ],
      },
      {
        heading: "Kompresi cerdas sesuai format",
        body: [
          "JPEG dan WebP dikompres dengan encoder perseptual yang membuang detail yang nyaris tak terlihat mata. Gambar PNG dioptimalkan dengan kompresi lossless maksimal dan kuantisasi palet opsional, ideal untuk logo, ikon, dan tangkapan layar dengan warna datar.",
          "Untuk foto, mengonversi ke WebP saat kompresi biasanya menghemat 25–35% lagi dibanding JPEG pada kualitas visual yang sama — cukup satu pengaturan di pemilih format.",
        ],
      },
      {
        heading: "Situs lebih cepat, biaya lebih hemat",
        body: [
          "Gambar terkompres memuat lebih cepat, peringkat lebih baik, dan lebih murah disajikan. Jika Anda punya toko, blog, atau portofolio, mengompres setiap gambar sebelum dipublikasikan adalah salah satu peningkatan performa berdampak tinggi — dan di sini hanya butuh beberapa detik.",
        ],
      },
    ],
    faqs: [
      { q: "Seberapa kecil gambar saya nantinya?", a: "Tergantung kontennya, tetapi foto umumnya menyusut 60–80% dengan sedikit perbedaan terlihat, terutama jika diekspor sebagai WebP." },
      { q: "Apa itu mode ukuran target?", a: "Alih-alih memilih nilai kualitas, Anda memasukkan ukuran file yang diinginkan (mis. 100 KB) dan alat mencari kualitas tertinggi yang tetap di bawahnya." },
      { q: "Apakah kompresi menurunkan kualitas?", a: "Kompresi lossy membuang sebagian detail, tetapi pada tingkat wajar perbedaannya sulit terlihat. Kompresi PNG di sini lossless kecuali mode palet dipakai." },
      { q: "Bisakah saya mengompres file PNG?", a: "Bisa. PNG dioptimalkan secara lossless, dan kuantisasi palet diterapkan pada kualitas lebih rendah untuk penghematan besar pada grafik warna datar." },
      { q: "Apakah ada batas ukuran file?", a: "Setiap unggahan maksimal 20 MB. Untuk banyak file sekaligus, gunakan alat massal." },
    ],
  },
  "resize-image-to-100kb": {
    h1: "Ubah Ukuran Gambar ke 100KB",
    navLabel: "Resize ke 100KB",
    metaTitle: "Ubah Ukuran Gambar ke 100KB Online – Kompres Foto di Bawah 100 KB",
    metaDescription:
      "Perkecil foto apa pun hingga di bawah 100 KB online gratis. Cocok untuk formulir ujian, lamaran kerja, dan unggahan dengan batas 100 KB. Menjaga kualitas terbaik.",
    keywords: ["ubah ukuran gambar ke 100kb", "kompres gambar ke 100kb", "foto di bawah 100kb", "perkecil foto 100kb", "kompres foto 100kb"],
    intro:
      "Butuh foto di bawah 100 KB untuk formulir online, pendaftaran ujian, atau lamaran kerja? Unggah gambar Anda dan ImgKilat otomatis menemukan kualitas tertinggi yang tetap di bawah 100 KB.",
    content: [
      {
        heading: "Foto di bawah 100 KB secara instan",
        body: [
          "Banyak portal pemerintah, formulir ujian universitas, dan situs lamaran kerja menolak foto lebih dari 100 KB. Melakukannya manual itu melelahkan — Anda menebak nilai kualitas, ekspor, cek ukuran, dan ulangi. ImgKilat menghilangkan tebak-tebakan itu.",
          "- Unggah foto JPG, PNG, atau WebP Anda.",
          "- Target sudah diatur ke 100 KB.",
          "- Aplikasi melakukan pencarian biner kualitas agar mendarat tepat di bawah batas sambil menjaga gambar setajam mungkin.",
          "- Unduh file yang dijamin di bawah 100 KB.",
        ],
      },
      {
        heading: "Mengapa batas 100 KB begitu umum",
        body: [
          "Batas 100 KB menjaga penyimpanan server tetap terkendali ketika jutaan pelamar mengunggah dokumen. Batas ini biasanya berlaku untuk foto ala paspor dan tanda tangan, di mana file kecil sudah cukup memadai. Kuncinya adalah mencapai ukuran itu tanpa membuat foto tidak terbaca — dan itulah tujuan kompresi ukuran target.",
          "Jika foto masih agak buram pada 100 KB, coba perkecil dimensinya dulu (misalnya ke 600×800) lalu kompres; dimensi yang lebih kecil mencapai target pada kualitas yang jauh lebih tinggi.",
        ],
      },
      {
        heading: "Berlaku untuk target ukuran apa pun",
        body: [
          "Meski halaman ini disetel ke 100 KB, Anda bisa mengubah target ke 50 KB, 200 KB, 1 MB, atau nilai apa pun yang diminta formulir Anda. Pencarian cerdas yang sama berlaku, jadi Anda selalu mendapat gambar terbaik yang muat.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah foto selalu di bawah 100 KB?", a: "Ya. Alat mencari ke bawah hingga hasilnya di bawah target Anda, jadi file yang diunduh dijamin muat." },
      { q: "Foto saya buram pada 100 KB. Apa yang bisa dilakukan?", a: "Perkecil dimensi piksel dulu (mis. ke 600×800), lalu kompres. Lebih sedikit piksel berarti anggaran 100 KB lebih lega." },
      { q: "Bisakah menargetkan ukuran lain?", a: "Tentu. Ubah kolom target ke 50 KB, 200 KB, atau lainnya dan alat menyesuaikan otomatis." },
      { q: "Apakah cocok untuk formulir ujian dan kerja?", a: "Ya, ini dirancang khusus untuk unggahan foto paspor dan dokumen yang menerapkan batas ukuran ketat." },
    ],
  },
  "passport-photo-resizer": {
    h1: "Pengubah Ukuran Foto Paspor",
    navLabel: "Foto Paspor",
    metaTitle: "Ubah Ukuran Foto Paspor Online – Resize Foto ke Ukuran Paspor",
    metaDescription:
      "Ubah foto Anda ke ukuran paspor (35×45 mm / 413×531 px) online gratis. Dapatkan foto paspor, visa, atau KTP siap cetak dalam hitungan detik. Tanpa daftar, tanpa watermark.",
    keywords: ["ukuran foto paspor", "foto paspor online", "resize foto paspor", "foto visa", "ukuran foto 35x45", "foto paspor 413x531"],
    intro:
      "Ubah potret apa pun menjadi foto ukuran paspor standar (35×45 mm pada 300 DPI = 413×531 piksel). Resize, lalu unduh gambar siap cetak untuk keperluan paspor, visa, dan kartu identitas.",
    content: [
      {
        heading: "Dimensi foto paspor standar",
        body: [
          "Ukuran foto paspor yang paling banyak diterima adalah 35×45 mm. Pada 300 DPI yang diperlukan untuk cetak, itu setara 413×531 piksel — dimensi yang sudah dikonfigurasi alat ini.",
          "- Unggah potret menghadap depan yang jelas dengan latar polos.",
          "- Ukuran sudah diatur ke 413×531 px (35×45 mm).",
          "- Lihat pratinjau bingkai, sesuaikan bila perlu, lalu unduh.",
          "- Cetak pada 300 DPI, atau unggah langsung ke aplikasi online yang meminta dimensi ini.",
        ],
      },
      {
        heading: "Tips agar foto diterima",
        body: [
          "- Gunakan pencahayaan merata dan latar putih atau abu-abu muda yang polos.",
          "- Menghadap kamera langsung dengan ekspresi netral dan mata terbuka.",
          "- Pastikan kepala dan bagian atas bahu terlihat dan berada di tengah.",
          "- Hindari bayangan, pantulan pada kacamata, dan penutup kepala kecuali untuk alasan keagamaan.",
          "Negara berbeda kadang meminta ukuran sedikit berbeda (misalnya 2×2 inci / 600×600 px untuk visa AS). Anda bisa mengubah kolom lebar dan tinggi sesuai spesifikasi apa pun.",
        ],
      },
      {
        heading: "Hasil siap cetak",
        body: [
          "Setelah resize, foto diekspor dengan kualitas tinggi sehingga tetap tajam saat dicetak pada dimensi paspor standar. Padukan dengan alat kompres jika portal online juga menerapkan batas ukuran file seperti 100 KB.",
        ],
      },
    ],
    faqs: [
      { q: "Berapa ukuran foto paspor standar dalam piksel?", a: "35×45 mm pada 300 DPI adalah 413×531 piksel, yang menjadi default alat ini. Foto visa AS biasanya 2×2 inci (600×600 px)." },
      { q: "Bisakah dipakai untuk foto visa atau KTP?", a: "Bisa. Sesuaikan lebar dan tinggi dengan ketentuan negara Anda dan unduh gambar berukuran tepat." },
      { q: "Bagaimana agar juga di bawah 100 KB?", a: "Gunakan alat resize-ke-100KB setelah resize, atau kompres file hasil unduhan untuk memenuhi batas ukuran portal." },
      { q: "Apakah menghapus latar belakang?", a: "Tidak, alat ini mengubah ukuran dan membingkai foto Anda. Gunakan latar polos saat memotret untuk hasil terbaik." },
    ],
  },
  "jpg-to-png": {
    h1: "Konversi JPG ke PNG",
    navLabel: "JPG ke PNG",
    metaTitle: "Konverter JPG ke PNG Online – Ubah JPEG ke PNG Gratis",
    metaDescription:
      "Konversi gambar JPG/JPEG ke PNG online gratis. Hasil PNG lossless yang ramah pengeditan dan siap transparansi. Cepat, aman, tanpa watermark.",
    keywords: ["jpg ke png", "jpeg ke png", "konversi jpg ke png", "ubah jpg ke png", "convert jpg ke png"],
    intro:
      "Konversi gambar JPG dan JPEG ke PNG berkualitas tinggi. PNG bersifat lossless dan ramah pengeditan, ideal saat Anda butuh file sumber yang bersih untuk pekerjaan desain lanjutan.",
    content: [
      {
        heading: "Cara mengonversi JPG ke PNG",
        body: [
          "Unggah file JPG Anda dan ImgKilat mengenkode ulang menjadi PNG dengan kompresi lossless, lalu memberikan unduhannya. Seluruh proses berjalan di sisi server dalam satu permintaan tanpa menyimpan apa pun setelahnya.",
          "- Letakkan gambar JPG atau JPEG ke kotak unggah.",
          "- Format hasil dikunci ke PNG.",
          "- Unduh PNG hasil konversi segera.",
        ],
      },
      {
        heading: "Mengapa mengonversi ke PNG?",
        body: [
          "PNG adalah format lossless, jadi tidak pernah menambah artefak kompresi kotak-kotak seperti yang ditimbulkan penyimpanan JPEG berulang. Ini pilihan tepat saat Anda berencana terus mengedit gambar, butuh teks dan tepi yang tajam, atau saat alat/platform secara khusus meminta PNG.",
          "Perlu diingat, JPG yang dikonversi ke PNG biasanya lebih besar di disk, karena PNG tidak membuang detail seperti JPEG. JPG asli juga tidak otomatis mendapat transparansi — tetapi setelah menjadi PNG, Anda bisa menambahkan latar transparan di editor.",
        ],
      },
      {
        heading: "Lossless dan akurat",
        body: [
          "Konversi mempertahankan piksel JPG Anda persis dan memutarnya dengan benar berdasarkan orientasi EXIF, jadi yang Anda lihat itulah yang Anda dapat. Warna tetap setia dan tidak ada kualitas yang hilang pada langkah pengkodean PNG.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah konversi JPG ke PNG lossless?", a: "Pengkodean PNG sendiri lossless. Artefak kompresi yang sudah ada di JPG sumber tetap ada, tetapi tidak ada yang baru hilang." },
      { q: "Apakah PNG akan lebih besar dari JPG?", a: "Biasanya ya, karena PNG menjaga semua detail sementara JPG membuang sebagian. Itu kompromi untuk hasil lossless yang ramah edit." },
      { q: "Apakah PNG punya latar transparan?", a: "Tidak. Konversi tidak menambah transparansi, tetapi PNG memungkinkan Anda menghapus latar di editor gambar setelahnya." },
      { q: "Apakah ada batas ukuran file?", a: "File tunggal maksimal 20 MB. Gunakan alat massal untuk mengonversi banyak gambar sekaligus." },
    ],
  },
  "png-to-jpg": {
    h1: "Konversi PNG ke JPG",
    navLabel: "PNG ke JPG",
    metaTitle: "Konverter PNG ke JPG Online – Ubah PNG ke JPEG Gratis",
    metaDescription:
      "Konversi gambar PNG ke JPG/JPEG online gratis. Perkecil ukuran file secara drastis dengan kualitas yang dapat diatur. Latar putih untuk area transparan. Tanpa watermark.",
    keywords: ["png ke jpg", "png ke jpeg", "konversi png ke jpg", "ubah png ke jpg", "convert png ke jpg"],
    intro:
      "Konversi gambar PNG ke file JPG yang ringkas. JPG sempurna untuk foto dan berbagi karena menghasilkan file jauh lebih kecil daripada PNG dengan kualitas visual yang sangat baik.",
    content: [
      {
        heading: "Cara mengonversi PNG ke JPG",
        body: [
          "Unggah PNG dan unduh JPG dalam hitungan detik. Area transparan akan diratakan ke latar putih, karena JPG tidak mendukung transparansi.",
          "- Unggah file PNG Anda.",
          "- Hasil diatur ke JPG; pilih tingkat kualitas bila mau.",
          "- Unduh file JPG yang lebih kecil.",
        ],
      },
      {
        heading: "Mengapa mengonversi PNG ke JPG?",
        body: [
          "File PNG — terutama tangkapan layar dan grafik hasil ekspor — bisa mengejutkan besarnya. Untuk foto dan apa pun yang ingin Anda email, unggah, atau posting, JPG jauh lebih kecil sambil terlihat hampir identik. Mengonversi PNG berat ke JPG sering memangkas ukuran file 80% atau lebih.",
          "Karena JPG didukung secara universal, ini juga format paling aman untuk kompatibilitas di perangkat lama, formulir, dan printer.",
        ],
      },
      {
        heading: "Kualitas yang Anda kontrol",
        body: [
          "Anda menentukan tingkat kualitas JPG. Sekitar 80% adalah titik ideal untuk sebagian besar gambar, menyeimbangkan ukuran file kecil dengan kualitas yang nyaris tak terbedakan dari aslinya.",
        ],
      },
    ],
    faqs: [
      { q: "Apa yang terjadi pada area transparan?", a: "JPG tidak punya transparansi, jadi piksel transparan ditempatkan pada latar putih saat konversi." },
      { q: "Seberapa kecil JPG nantinya?", a: "Sering 70–90% lebih kecil dari PNG, terutama untuk konten foto." },
      { q: "Bisakah saya mengatur kualitas JPG?", a: "Bisa. Gunakan kontrol kualitas untuk menyeimbangkan ukuran file dan ketajaman visual." },
      { q: "Apakah gratis dan tanpa watermark?", a: "Sepenuhnya gratis tanpa watermark dan tanpa daftar." },
    ],
  },
  "png-to-webp": {
    h1: "Konversi PNG ke WebP",
    navLabel: "PNG ke WebP",
    metaTitle: "Konverter PNG ke WebP Online – Ubah PNG ke WebP Gratis",
    metaDescription:
      "Konversi PNG ke WebP online gratis. WebP menghasilkan file jauh lebih kecil daripada PNG dengan kualitas yang sama — sempurna untuk situs modern yang cepat. Tanpa watermark.",
    keywords: ["png ke webp", "konversi png ke webp", "ubah png ke webp", "convert png ke webp"],
    intro:
      "Konversi gambar PNG ke WebP modern. WebP memberi kualitas visual yang sama pada ukuran jauh lebih kecil, ideal untuk mempercepat situs dan meningkatkan Core Web Vitals.",
    content: [
      {
        heading: "Cara mengonversi PNG ke WebP",
        body: [
          "Unggah PNG dan dapatkan unduhan WebP dalam hitungan detik. WebP mendukung mode lossy dan lossless serta menjaga transparansi, jadi benar-benar pengganti langsung PNG di web.",
          "- Unggah gambar PNG Anda.",
          "- Hasil diatur ke WebP; pilih tingkat kualitas bila diinginkan.",
          "- Unduh file WebP yang jauh lebih ringan.",
        ],
      },
      {
        heading: "Mengapa WebP?",
        body: [
          "WebP dirancang Google khusus untuk web. Dibanding PNG, WebP rutin menghasilkan file 25–80% lebih kecil pada kualitas setara, sambil tetap mendukung transparansi. Gambar lebih kecil berarti halaman lebih cepat, peringkat pencarian lebih baik, dan biaya bandwidth lebih rendah.",
          "Setiap browser modern mendukung WebP, jadi nyaris tidak ada alasan untuk tidak memakainya pada grafik situs, gambar hero, dan foto produk.",
        ],
      },
      {
        heading: "Transparansi terjaga",
        body: [
          "Berbeda dengan konversi ke JPG, berpindah dari PNG ke WebP menjaga transparansi alfa Anda. Logo dan ikon tetap bersih di latar apa pun sambil menjadi jauh lebih kecil dari ukuran aslinya.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah WebP menjaga transparansi?", a: "Ya. WebP mendukung kanal alfa, jadi PNG transparan dikonversi tanpa menambahkan latar." },
      { q: "Seberapa kecil WebP dibanding PNG?", a: "Umumnya 25–80% lebih kecil pada kualitas visual sama, tergantung gambarnya." },
      { q: "Apakah semua browser mendukung WebP?", a: "Ya, semua browser utama saat ini mendukung WebP, jadi aman untuk situs produksi." },
      { q: "Apakah konversinya gratis?", a: "Ya, gratis tanpa watermark dan tanpa akun." },
    ],
  },
  "jpg-to-webp": {
    h1: "Konversi JPG ke WebP",
    navLabel: "JPG ke WebP",
    metaTitle: "Konverter JPG ke WebP Online – Ubah JPEG ke WebP Gratis",
    metaDescription:
      "Konversi JPG/JPEG ke WebP online gratis. Buat foto hingga 35% lebih kecil dari JPG pada kualitas sama untuk situs lebih cepat. Tanpa daftar, tanpa watermark.",
    keywords: ["jpg ke webp", "jpeg ke webp", "konversi jpg ke webp", "ubah jpg ke webp", "convert jpg ke webp"],
    intro:
      "Konversi foto JPG ke WebP untuk memangkas 25–35% ukuran file pada kualitas yang sama. Cara tercepat membuat halaman penuh gambar memuat lebih cepat.",
    content: [
      {
        heading: "Cara mengonversi JPG ke WebP",
        body: [
          "Unggah JPG dan unduh WebP yang terlihat sama tetapi lebih ringan. Ideal untuk blog, toko, dan portofolio di mana setiap kilobita berarti.",
          "- Unggah file JPG atau JPEG Anda.",
          "- Hasil diatur ke WebP; sesuaikan kualitas bila mau.",
          "- Unduh gambar WebP yang lebih kecil.",
        ],
      },
      {
        heading: "Kompresi lebih baik daripada JPEG",
        body: [
          "Kompresi modern WebP biasanya mengungguli JPEG sebesar 25–35% pada kualitas yang dirasakan sama. Untuk halaman penuh foto produk, ini berarti pengalaman yang terasa lebih cepat dan skor PageSpeed lebih baik.",
          "Karena WebP kini didukung secara universal di browser, mengonversi JPG Anda adalah salah satu peningkatan performa paling sederhana yang bisa dilakukan.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah WebP lebih baik dari JPG?", a: "Untuk web, biasanya ya — WebP mencapai kualitas sama pada ukuran lebih kecil dan didukung di mana saja." },
      { q: "Apakah saya kehilangan kualitas saat konversi?", a: "Pada pengaturan kualitas wajar, perbedaannya tak terlihat, dan filenya lebih kecil." },
      { q: "Bisakah konversi massal?", a: "Bisa, gunakan alat massal untuk mengonversi banyak JPG ke WebP dan mengunduhnya sebagai ZIP." },
    ],
  },
  "webp-to-jpg": {
    h1: "Konversi WebP ke JPG",
    navLabel: "WebP ke JPG",
    metaTitle: "Konverter WebP ke JPG Online – Ubah WebP ke JPEG Gratis",
    metaDescription:
      "Konversi gambar WebP ke JPG/JPEG online gratis. Dapatkan foto kompatibel universal yang bisa dibuka dan dibagikan di mana saja. Cepat, aman, tanpa watermark.",
    keywords: ["webp ke jpg", "webp ke jpeg", "konversi webp ke jpg", "ubah webp ke jpg", "convert webp ke jpg"],
    intro:
      "Mengunduh WebP dan butuh JPG biasa? Konversi WebP ke JPG secara instan untuk kompatibilitas maksimal dengan aplikasi, editor, dan perangkat yang tidak menerima WebP.",
    content: [
      {
        heading: "Cara mengonversi WebP ke JPG",
        body: [
          "Unggah file WebP Anda dan unduh JPG yang siap dipakai di mana saja. Area transparan diratakan ke putih, karena JPG tidak punya kanal alfa.",
          "- Unggah gambar WebP.",
          "- Hasil diatur ke JPG; pilih kualitas bila perlu.",
          "- Unduh JPG yang kompatibel.",
        ],
      },
      {
        heading: "Mengapa mengonversi WebP ke JPG?",
        body: [
          "Meski WebP bagus untuk web, sebagian program lama, printer, dan formulir unggah masih mengharapkan JPG. Konversi memberi Anda file yang terbuka di mana saja tanpa masalah, pada tingkat kualitas yang Anda kontrol.",
        ],
      },
    ],
    faqs: [
      { q: "Mengapa WebP saya tidak terbuka di beberapa aplikasi?", a: "Perangkat lunak lama mungkin belum mendukung WebP. Mengonversi ke JPG langsung mengatasi masalah kompatibilitas." },
      { q: "Apa yang terjadi pada transparansi?", a: "JPG tidak mendukung transparansi, jadi area transparan diisi dengan putih." },
      { q: "Apakah gratis?", a: "Ya, gratis tanpa watermark atau daftar." },
    ],
  },
  "webp-to-png": {
    h1: "Konversi WebP ke PNG",
    navLabel: "WebP ke PNG",
    metaTitle: "Konverter WebP ke PNG Online – Ubah WebP ke PNG Gratis",
    metaDescription:
      "Konversi WebP ke PNG online gratis dengan kualitas lossless dan transparansi terjaga. Sempurna untuk pengeditan dan kompatibilitas maksimal. Tanpa watermark.",
    keywords: ["webp ke png", "konversi webp ke png", "ubah webp ke png", "convert webp ke png"],
    intro:
      "Konversi gambar WebP ke PNG lossless sambil menjaga transparansi. Ideal saat Anda butuh file yang ramah pengeditan dan kompatibel luas.",
    content: [
      {
        heading: "Cara mengonversi WebP ke PNG",
        body: [
          "Unggah WebP dan unduh PNG yang mempertahankan setiap piksel dan transparansi apa pun. Bagus untuk pekerjaan desain dan alat yang membutuhkan input PNG.",
          "- Unggah gambar WebP Anda.",
          "- Hasil diatur ke PNG.",
          "- Unduh PNG lossless.",
        ],
      },
      {
        heading: "Lossless dan transparan",
        body: [
          "PNG menyimpan salinan gambar Anda yang persis dan lossless serta mendukung kanal alfa, jadi grafik WebP transparan tetap transparan. Ini menjadikan PNG pilihan aman untuk logo dan ikon yang ingin Anda terus edit.",
        ],
      },
    ],
    faqs: [
      { q: "Apakah PNG menjaga transparansi?", a: "Ya. Transparansi dari WebP dipertahankan pada hasil PNG." },
      { q: "Apakah konversinya lossless?", a: "Pengkodean PNG lossless, menangkap piksel WebP yang sudah didekode persis." },
      { q: "Apakah PNG akan lebih besar?", a: "Sering ya, karena PNG lossless. Itu kompromi untuk kualitas dan kompatibilitas maksimal." },
    ],
  },
  "convert-image": {
    h1: "Konversi Gambar Online",
    navLabel: "Konversi",
    metaTitle: "Konversi Gambar Online – Konverter JPG, PNG & WebP Gratis",
    metaDescription:
      "Konverter gambar online gratis. Konversi antara JPG, PNG, dan WebP ke segala arah dengan kontrol kualitas. Cepat, privat, dan tanpa watermark.",
    keywords: ["konversi gambar", "konverter gambar", "ubah format gambar", "convert gambar", "konverter jpg png webp"],
    intro:
      "Konversi gambar antara JPG, PNG, dan WebP ke segala arah. Pilih input, tentukan format hasil, atur kualitas, lalu unduh — semuanya di browser Anda.",
    content: [
      {
        heading: "Satu konverter, segala arah",
        body: [
          "ImgKilat mengonversi antara tiga format yang penting untuk web modern. Entah Anda butuh WebP lebih kecil untuk performa, PNG lossless untuk pengeditan, atau JPG kompatibel universal untuk berbagi, semuanya hanya sejauh satu dropdown.",
          "- Unggah JPG, PNG, atau WebP apa pun.",
          "- Pilih format hasil dan kualitas.",
          "- Unduh secara instan — tanpa akun, tanpa watermark.",
        ],
      },
      {
        heading: "Memilih format yang tepat",
        body: [
          "- JPG: terbaik untuk foto dan berbagi; file terkecil pada kualitas bagus, tetapi tanpa transparansi.",
          "- PNG: lossless dan mendukung transparansi; terbaik untuk grafik, logo, dan pengeditan.",
          "- WebP: format web modern; lebih kecil dari JPG maupun PNG pada kualitas sama, dengan dukungan transparansi.",
        ],
      },
    ],
    faqs: [
      { q: "Format apa saja yang bisa dikonversi?", a: "Segala arah di antara JPG, PNG, dan WebP." },
      { q: "Bisakah saya mengontrol kualitas?", a: "Bisa, slider kualitas tersedia untuk hasil lossy (JPG dan WebP)." },
      { q: "Apakah file saya tetap privat?", a: "Ya. Konversi berjalan di memori dan file dihapus segera setelahnya." },
    ],
  },
  "crop-image": {
    h1: "Potong Gambar Online",
    navLabel: "Potong",
    metaTitle: "Potong Gambar Online – Pemotong Foto Gratis (1:1, 4:3, 16:9)",
    metaDescription:
      "Potong gambar online gratis. Seret untuk memilih area atau gunakan rasio tetap seperti 1:1, 4:3, dan 16:9. Cocok untuk thumbnail, avatar, dan postingan media sosial.",
    keywords: ["potong gambar", "crop gambar", "potong foto online", "pemotong foto", "crop foto 1:1", "crop 16:9"],
    intro:
      "Pangkas dan bingkai ulang foto Anda dengan menyeret area potong, atau kunci ke rasio tetap seperti 1:1, 4:3, atau 16:9. Lihat pratinjau pilihan dan unduh hasil potongannya.",
    content: [
      {
        heading: "Cara memotong gambar",
        body: [
          "Memotong menghilangkan bagian foto yang tidak diinginkan dan mengubah bingkai atau rasio aspeknya. Dengan ImgKilat Anda cukup menyeret kotak di atas area yang ingin dipertahankan.",
          "- Unggah gambar JPG, PNG, atau WebP.",
          "- Seret sudut kotak potong, atau pilih rasio (bebas, 1:1, 4:3, 16:9).",
          "- Lihat pratinjau pilihan dan unduh gambar yang terpotong.",
        ],
      },
      {
        heading: "Rasio tetap untuk setiap platform",
        body: [
          "- 1:1 persegi — foto profil, avatar, dan postingan Instagram.",
          "- 4:3 — cetak foto klasik dan presentasi.",
          "- 16:9 — thumbnail YouTube, banner, dan layar lebar.",
          "Mengunci rasio menjamin potongan Anda pas dengan tujuan tanpa coba-coba.",
        ],
      },
      {
        heading: "Pemotongan akurat per piksel",
        body: [
          "Potongan diterapkan di server pada resolusi penuh, jadi Anda menjaga setiap detail di dalam area terpilih. Tidak ada pembesaran dan tidak ada kehilangan kualitas dari proses potong itu sendiri.",
        ],
      },
    ],
    faqs: [
      { q: "Bisakah memotong menjadi persegi?", a: "Bisa. Pilih rasio 1:1 dan kotak potong tetap persegi sempurna saat Anda menyeret." },
      { q: "Apakah memotong menurunkan kualitas?", a: "Tidak. Memotong menjaga piksel asli di dalam pilihan Anda pada resolusi penuh." },
      { q: "Rasio apa saja yang tersedia?", a: "Bebas ditambah rasio tetap 1:1, 4:3, dan 16:9. Anda bisa memindahkan dan mengubah ukuran pilihan dengan bebas." },
      { q: "Apakah gratis?", a: "Ya, sepenuhnya gratis tanpa watermark." },
    ],
  },
  "bulk-image-resizer": {
    h1: "Ubah Ukuran & Kompres Gambar Massal",
    navLabel: "Massal",
    metaTitle: "Resize Gambar Massal Online – Ubah Ukuran & Kompres Banyak Sekaligus",
    metaDescription:
      "Ubah ukuran, kompres, dan konversi banyak gambar sekaligus online. Unggah hingga 30 file, proses bersamaan, dan unduh semuanya sebagai ZIP. Gratis dan privat.",
    keywords: ["resize gambar massal", "ubah ukuran banyak gambar", "kompres banyak gambar", "konversi gambar massal", "batch resize"],
    intro:
      "Proses banyak gambar sekaligus. Unggah satu batch, terapkan resize, kompresi, atau konversi yang sama ke semuanya, lalu unduh seluruh set sebagai satu file ZIP.",
    content: [
      {
        heading: "Cara kerja pemrosesan massal",
        body: [
          "Mengedit gambar satu per satu itu lambat. Alat massal menerapkan operasi yang sama ke setiap file yang Anda unggah dan mengemas hasilnya bersama.",
          "- Letakkan hingga 30 file JPG, PNG, atau WebP sekaligus.",
          "- Pilih operasi: resize berdasarkan persen/dimensi, kompres, atau konversi format.",
          "- Proses semuanya bersama dan unduh satu arsip ZIP.",
        ],
      },
      {
        heading: "Sempurna untuk toko dan galeri",
        body: [
          "Jika Anda mengelola toko, listing properti, atau galeri foto, sering kali ada puluhan gambar yang butuh perlakuan sama. Pemrosesan massal mengubah pekerjaan yang melelahkan menjadi beberapa klik, dan setiap hasil tetap konsisten dalam ukuran dan kualitas.",
        ],
      },
      {
        heading: "Pekerjaan berat, ditangani dengan bijak",
        body: [
          "Batch besar diproses efisien di server dan dikirim balik sebagai ZIP. Saat antrean Redis dikonfigurasi, pekerjaan sangat besar bisa dialihkan ke worker latar belakang agar antarmuka tetap responsif. File yang diunggah tidak pernah disimpan — dihapus segera setelah ZIP dibuat.",
        ],
      },
    ],
    faqs: [
      { q: "Berapa banyak gambar yang bisa diproses sekaligus?", a: "Hingga 30 file per batch, masing-masing maksimal 20 MB." },
      { q: "Bagaimana cara mendapatkan file saya kembali?", a: "Semua gambar yang diproses dikemas menjadi satu ZIP yang Anda unduh dengan sekali klik." },
      { q: "Bisakah mencampur operasi?", a: "Setiap batch menerapkan satu operasi ke semua file. Jalankan beberapa batch untuk operasi berbeda." },
      { q: "Apakah file disimpan di suatu tempat?", a: "Tidak. Semuanya diproses di memori dan dihapus begitu ZIP dikirim." },
    ],
  },
};
