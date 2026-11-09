# Temu Dokumen

Pencarian lokal untuk dokumentasi Markdown. Pembuat indeks Node membaca folder dan menyimpan JSON baru; browser mencari judul dan teks tanpa server.

## Cara mencoba

Memerlukan Node.js 20+ untuk membuat indeks. Dari folder proyek:

```sh
node build-index.js examples demo-index.json
npm test
```

Buka `index.html` pada browser modern dan pilih `demo-index.json`, lalu cari kata `instalasi`. File indeks harus berada di luar folder sumber dan belum ada; pembuat indeks tidak mengikuti symbolic link. Hasil menampilkan judul, path, dan 200 karakter pertama, bukan tautan yang membuka file. Hasil diberi skor sederhana: judul lebih berat daripada isi.

## Batasan

Maksimum 1.000 file, 1 MB per file, dan 20.000 karakter teks per dokumen. Parsing Markdown adalah pendekatan sederhana; bukan renderer Markdown atau parser lengkap. Indeks mengandung teks dokumen: jangan publikasikan indeks dari dokumen privat. Tidak ada sinkronisasi otomatis, stemming atau pencarian frasa. Rendering hasil menggunakan textContent; audit keamanan independen dan pengujian aksesibilitas belum dilakukan. Dibuat dengan bantuan OpenAI Codex.

**English:** Local Markdown indexer and browser search with simple title weighting. Index files may contain private document text; keep them private.
