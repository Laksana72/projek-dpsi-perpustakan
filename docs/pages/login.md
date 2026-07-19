# Login Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Login digunakan sebagai autentikasi pengguna sebelum mengakses sistem perpustakaan.

Halaman ini hanya mengatur tampilan antarmuka (Frontend).

Pada tahap ini proses login menggunakan Dummy Authentication.

Backend akan diintegrasikan pada tahap berikutnya.

---

# 2. Target User

Halaman Login digunakan oleh:

- Mahasiswa
- Dosen
- Staff
- Administrator

---

# 3. Reference

Halaman harus mengikuti desain Login yang telah ditentukan pada Design System.

AI Agent tidak diperbolehkan mengubah layout.

---

# 4. Layout Structure

Login Page terdiri dari dua area utama.

-------------------------------------------------

Background Image

↓

Login Card

-------------------------------------------------

Layout menggunakan satu halaman penuh (Full Screen).

---

# 5. Background

Background menggunakan gambar gedung perpustakaan.

Ditambahkan overlay berwarna Primary dengan opacity agar teks tetap terbaca.

Background harus memenuhi seluruh layar.

---

# 6. Login Card

Posisi

Center

Width Desktop

420 px

Padding

32 px

Border Radius

16 px

Shadow

Large

Background

White

---

# 7. Card Content

Urutan isi card:

Logo Perpustakaan

↓

Judul

↓

Sub Judul

↓

Input Username / Email

↓

Input Password

↓

Remember Me

↓

Button Login

↓

Forgot Password

---

# 8. Logo

Logo berada di bagian atas.

Ukuran

64 px

Posisi

Center

---

# 9. Title

Selamat Datang

Font

Heading 2

Weight

Bold

Alignment

Center

---

# 10. Subtitle

Silakan login untuk mengakses layanan perpustakaan.

Alignment

Center

Color

Neutral Gray

---

# 11. Username Field

Label

Username atau Email

Placeholder

Masukkan Username atau Email

Type

Text

Required

Ya

---

# 12. Password Field

Label

Password

Placeholder

Masukkan Password

Type

Password

Required

Ya

Terdapat tombol Show / Hide Password.

---

# 13. Remember Me

Checkbox

Label

Ingat Saya

Default

Unchecked

---

# 14. Forgot Password

Link

Lupa Password?

Saat ini hanya sebagai placeholder.

Belum memiliki fungsi.

---

# 15. Login Button

Text

Masuk

Lebar

100%

Height

48 px

Background

Primary Color

Hover

Primary Dark

Active

Primary Dark

Disabled

Gray

---

# 16. Validation

Field Username kosong

↓

Tampilkan pesan

"Username wajib diisi."

Field Password kosong

↓

Tampilkan pesan

"Password wajib diisi."

Validasi dilakukan saat tombol Login ditekan.

---

# 17. Authentication Flow

User mengisi Username

↓

User mengisi Password

↓

Klik Login

↓

Validasi Input

↓

Dummy Authentication

↓

Jika berhasil

↓

Masuk Dashboard

↓

Jika gagal

↓

Tampilkan Error Message

---

# 18. Dummy Login

Frontend menggunakan Dummy Authentication.

Contoh akun:

User

Username

user

Password

123456

Role

User

----------------------------

Admin

Username

admin

Password

admin123

Role

Administrator

---

# 19. Redirect

Login berhasil sebagai User

↓

Dashboard User

Route

/dashboard

---

Login berhasil sebagai Admin

↓

Dashboard Admin

Route

/admin/dashboard

---

# 20. Components

Halaman menggunakan komponen berikut.

- Card
- Logo
- Input
- Password Input
- Checkbox
- Button
- Typography

Semua komponen harus reusable.

---

# 21. Interaction

Input memiliki Focus State.

Button memiliki Hover State.

Password dapat ditampilkan dan disembunyikan.

Checkbox dapat dipilih.

Loading Button muncul saat proses login.

---

# 22. Error State

Username salah

↓

Alert Error

----------------------------

Password salah

↓

Alert Error

----------------------------

Field kosong

↓

Validation Message

---

# 23. Responsive

Desktop

Card berada di tengah.

Background memenuhi layar.

---

Tablet

Card mengecil.

Padding disesuaikan.

---

Mobile

Card memenuhi hampir seluruh lebar layar.

Padding 24 px.

---

# 24. Accessibility

Seluruh input memiliki label.

Tab berpindah secara berurutan.

Enter menjalankan Login.

Password memiliki tombol Show/Hide.

---

# 25. Dummy Data

Data autentikasi berasal dari:

src/data/users.ts

Tidak menggunakan Backend.

---

# 26. Acceptance Criteria

✓ Background tampil.

✓ Login Card tampil.

✓ Logo tampil.

✓ Input Username tampil.

✓ Input Password tampil.

✓ Remember Me tampil.

✓ Forgot Password tampil.

✓ Button Login tampil.

✓ Validasi berjalan.

✓ Dummy Login berhasil.

✓ Redirect sesuai Role.

✓ Responsive.

✓ Mengikuti Design System.

✓ Menggunakan reusable components.

---

# 27. AI Agent Notes

AI Agent wajib:

- Menggunakan Guest Layout.
- Menggunakan React Hook Form.
- Menggunakan Zod untuk validasi.
- Menggunakan Tailwind CSS.
- Menggunakan React + TypeScript.
- Menggunakan Dummy Authentication.
- Tidak menghubungkan ke Backend.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
