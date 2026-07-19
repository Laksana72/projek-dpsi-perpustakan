# Logout Modal

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Logout Modal merupakan dialog konfirmasi yang muncul ketika pengguna memilih menu **Keluar**.

Modal bertujuan untuk mencegah pengguna keluar aplikasi secara tidak sengaja.

Pada tahap Frontend, proses logout masih menggunakan Dummy Authentication.

---

# 2. Target User

Modal digunakan oleh:

- Mahasiswa
- Dosen
- Staff
- Administrator

---

# 3. Reference

Modal mengikuti Design System.

AI Agent tidak diperbolehkan mengubah ukuran, posisi, maupun urutan komponen.

---

# 4. Trigger

Modal muncul ketika pengguna:

- Klik menu **Keluar** pada Sidebar
- Klik tombol **Logout** pada halaman Profil

---

# 5. Modal Layout

Modal tampil di tengah layar.

Background halaman menggunakan overlay gelap dengan opacity 50%.

Ukuran modal:

Width Desktop

420 px

Width Tablet

380 px

Width Mobile

90% dari lebar layar

Border Radius

16 px

Padding

32 px

Shadow

Large

Background

White

---

# 6. Modal Structure

Warning Icon

↓

Title

↓

Description

↓

Action Button

---

# 7. Warning Icon

Menggunakan icon:

Circle Alert

Ukuran

64 px

Warna

Warning / Orange

Posisi

Center

---

# 8. Title

Text

Keluar dari Aplikasi?

Font

Heading 3

Weight

Bold

Alignment

Center

---

# 9. Description

Text

Apakah Anda yakin ingin keluar dari sistem perpustakaan?

Anda harus login kembali untuk mengakses aplikasi.

Alignment

Center

Color

Neutral Gray

---

# 10. Action Buttons

Modal memiliki dua tombol.

Button Secondary

Batal

↓

Menutup modal

---

Button Primary

Keluar

↓

Logout

↓

Redirect ke Landing Page

---

# 11. Button Style

Button Batal

Background

White

Border

Primary

Text

Primary

---

Button Keluar

Background

Primary

Text

White

Hover

Primary Dark

---

# 12. User Flow

Klik Logout

↓

Modal Muncul

↓

Klik Batal

↓

Modal Ditutup

atau

↓

Klik Keluar

↓

Dummy Logout

↓

Landing Page

---

# 13. Interaction

Klik area di luar modal

↓

Modal ditutup

---

Tekan tombol ESC

↓

Modal ditutup

---

Klik Batal

↓

Modal ditutup

---

Klik Keluar

↓

Loading Button

↓

Redirect Landing Page

---

# 14. Loading State

Saat proses logout.

Button berubah menjadi Loading.

Button tidak dapat diklik dua kali.

---

# 15. Animation

Open

Fade In

+

Scale Up

Durasi

250 ms

---

Close

Fade Out

+

Scale Down

Durasi

200 ms

---

# 16. Accessibility

Focus pertama berada pada tombol **Batal**.

Navigasi menggunakan tombol **Tab**.

Tekan **Enter** pada tombol aktif akan menjalankan aksi.

Tekan **ESC** menutup modal.

Focus tidak boleh keluar dari modal selama modal masih terbuka.

---

# 17. Responsive

Desktop

Modal 420 px.

---

Tablet

Modal 380 px.

---

Mobile

Lebar 90%.

Padding 24 px.

---

# 18. Components

Modal menggunakan:

- Modal
- Icon
- Typography
- Button

Seluruh komponen wajib reusable.

---

# 19. Dummy Authentication

Logout hanya menghapus status login Dummy.

Tidak menggunakan Backend.

---

# 20. Acceptance Criteria

✓ Modal tampil di tengah layar.

✓ Overlay tampil.

✓ Icon Warning tampil.

✓ Judul tampil.

✓ Deskripsi tampil.

✓ Button Batal tampil.

✓ Button Keluar tampil.

✓ Klik luar modal menutup modal.

✓ Tombol ESC menutup modal.

✓ Loading Button tampil saat logout.

✓ Redirect ke Landing Page.

✓ Responsive.

✓ Menggunakan reusable components.

✓ Mengikuti Design System.

---

# 21. AI Agent Notes

AI Agent wajib:

- Menggunakan Modal Component.
- Menggunakan React Portal apabila diperlukan.
- Menggunakan Tailwind CSS.
- Menggunakan React + TypeScript.
- Menggunakan reusable component.
- Menggunakan Dummy Authentication.
- Tidak membuat API Call.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
