<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\Fine;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin user
        User::create([
            'name' => 'Admin Perpustakaan',
            'email' => 'admin@library.ac.id',
            'password' => Hash::make('admin123'),
            'nim' => 'ADM-001',
            'program_studi' => 'Manajemen Perpustakaan',
            'role' => 'admin',
            'membership_status' => 'Active',
            'membership_expiry' => '2027-12-31',
        ]);

        // Regular users
        User::create([
            'name' => 'Ahmad Rizki',
            'email' => 'ahmad.rizki@student.ac.id',
            'password' => Hash::make('password'),
            'nim' => '20241001',
            'program_studi' => 'Sistem Informasi',
            'role' => 'user',
            'membership_status' => 'Active',
            'membership_expiry' => '2026-12-31',
        ]);

        User::create([
            'name' => 'Siti Nurhaliza',
            'email' => 'siti.nurhaliza@student.ac.id',
            'password' => Hash::make('password'),
            'nim' => '20241002',
            'program_studi' => 'Sistem Informasi',
            'role' => 'user',
            'membership_status' => 'Active',
            'membership_expiry' => '2026-12-31',
        ]);

        // Simple login users
        User::create([
            'name' => 'admin',
            'email' => 'admin@perpustakaan.ac.id',
            'password' => Hash::make('admin123'),
            'nim' => 'ADM-002',
            'program_studi' => 'Administrasi',
            'role' => 'admin',
            'membership_status' => 'Active',
            'membership_expiry' => '2027-12-31',
        ]);

        User::create([
            'name' => 'user',
            'email' => 'user@perpustakaan.ac.id',
            'password' => Hash::make('123456'),
            'nim' => '20241003',
            'program_studi' => 'Sistem Informasi',
            'role' => 'user',
            'membership_status' => 'Active',
            'membership_expiry' => '2026-12-31',
        ]);

        // Categories
        $categories = [
            ['name' => 'Teknologi', 'description' => 'Buku tentang teknologi dan pemrograman'],
            ['name' => 'Ilmu Komputer', 'description' => 'Buku tentang ilmu komputer fundamental'],
            ['name' => 'Data Science', 'description' => 'Buku tentang data science dan machine learning'],
            ['name' => 'Basis Data', 'description' => 'Buku tentang database dan manajemen data'],
            ['name' => 'Jaringan', 'description' => 'Buku tentang jaringan komputer'],
            ['name' => 'Keamanan', 'description' => 'Buku tentang keamanan siber'],
            ['name' => 'Desain', 'description' => 'Buku tentang desain dan UI/UX'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Publishers
        $publishers = [
            ['name' => 'Penerbit Teknologi', 'address' => 'Jl. Merdeka No. 45, Jakarta', 'phone' => '021-1234567', 'email' => 'info@penerbitteknologi.com'],
            ['name' => 'Penerbit Ilmu Komputer', 'address' => 'Jl. Sudirman No. 78, Bandung', 'phone' => '022-2345678', 'email' => 'contact@ilkompublisher.com'],
            ['name' => 'Penerbit Data Science', 'address' => 'Jl. Gatot Subroto No. 12, Surabaya', 'phone' => '031-3456789', 'email' => 'hello@datasciencepub.com'],
            ['name' => 'Penerbit Informatika', 'address' => 'Jl. Diponegoro No. 56, Yogyakarta', 'phone' => '0274-4567890', 'email' => 'admin@informatikapub.com'],
            ['name' => 'Penerbit Jaringan', 'address' => 'Jl. Ahmad Yani No. 90, Semarang', 'phone' => '024-5678901', 'email' => 'support@jaringanpub.com'],
            ['name' => 'Penerbit Keamanan', 'address' => 'Jl. Pahlawan No. 34, Medan', 'phone' => '061-6789012', 'email' => 'info@keamananpub.com'],
            ['name' => 'Penerbit DevOps', 'address' => 'Jl. Veteran No. 23, Makassar', 'phone' => '0411-7890123', 'email' => 'contact@devopspub.com'],
            ['name' => 'Penerbit Desain', 'address' => 'Jl. Sumatra No. 67, Denpasar', 'phone' => '0361-8901234', 'email' => 'hello@desainpub.com'],
        ];

        foreach ($publishers as $pub) {
            Publisher::create($pub);
        }

        // Books - seed 8 specific books + 492 factory books = 500 total
        Book::create([
            'title' => 'Pemrograman Web dengan React',
            'author' => 'Andi Pratama',
            'isbn' => '978-602-1234-56-7',
            'publisher_id' => 1,
            'year' => 2024,
            'category_id' => 1,
            'description' => 'Buku ini membahas tentang pengembangan aplikasi web modern menggunakan React dan TypeScript. Cocok untuk pemula maupun developer yang ingin memperdalam pengetahuannya.',
            'cover' => '',
            'status' => 'Available',
            'pages' => 350,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2024-01-15',
            'location' => 'Rak A - 01',
            'call_number' => '005.13 AND p',
        ]);
        Book::create([
            'title' => 'Algoritma dan Struktur Data',
            'author' => 'Budi Santoso',
            'isbn' => '978-602-2345-67-8',
            'publisher_id' => 2,
            'year' => 2023,
            'category_id' => 2,
            'description' => 'Panduan lengkap memahami algoritma dan struktur data untuk persiapan kompetisi programming dan pengembangan aplikasi.',
            'cover' => '',
            'status' => 'Borrowed',
            'pages' => 420,
            'language' => 'Indonesia',
            'edition' => 'Edisi Kedua',
            'added_date' => '2023-06-20',
            'location' => 'Rak A - 02',
            'call_number' => '005.1 BUD a',
        ]);
        Book::create([
            'title' => 'Machine Learning untuk Pemula',
            'author' => 'Citra Dewi',
            'isbn' => '978-602-3456-78-9',
            'publisher_id' => 3,
            'year' => 2024,
            'category_id' => 3,
            'description' => 'Pengenalan konsep machine learning dengan studi kasus nyata menggunakan Python.',
            'cover' => '',
            'status' => 'Available',
            'pages' => 280,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2024-03-10',
            'location' => 'Rak A - 03',
            'call_number' => '006.31 CIT m',
        ]);
        Book::create([
            'title' => 'Basis Data Terdistribusi',
            'author' => 'Dian Kurniawan',
            'isbn' => '978-602-4567-89-0',
            'publisher_id' => 4,
            'year' => 2023,
            'category_id' => 4,
            'description' => 'Membahas konsep dan implementasi basis data terdistribusi untuk sistem informasi modern.',
            'cover' => '',
            'status' => 'Available',
            'pages' => 310,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2023-09-05',
            'location' => 'Rak A - 04',
            'call_number' => '005.74 DIA b',
        ]);
        Book::create([
            'title' => 'Jaringan Komputer Lanjutan',
            'author' => 'Eko Prasetyo',
            'isbn' => '978-602-5678-90-1',
            'publisher_id' => 5,
            'year' => 2024,
            'category_id' => 5,
            'description' => 'Studi mendalam tentang arsitektur jaringan komputer, protokol, dan keamanan jaringan.',
            'cover' => '',
            'status' => 'Borrowed',
            'pages' => 390,
            'language' => 'Indonesia',
            'edition' => 'Edisi Kedua',
            'added_date' => '2024-02-14',
            'location' => 'Rak B - 01',
            'call_number' => '004.65 EKO j',
        ]);
        Book::create([
            'title' => 'Keamanan Siber',
            'author' => 'Fajar Ramadhan',
            'isbn' => '978-602-6789-01-2',
            'publisher_id' => 6,
            'year' => 2024,
            'category_id' => 6,
            'description' => 'Panduan praktis melindungi sistem dan data dari serangan siber untuk profesional IT.',
            'cover' => '',
            'status' => 'Available',
            'pages' => 450,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2024-04-01',
            'location' => 'Rak B - 02',
            'call_number' => '005.8 FAJ k',
        ]);
        Book::create([
            'title' => 'DevOps dan CI/CD',
            'author' => 'Gita Ananda',
            'isbn' => '978-602-7890-12-3',
            'publisher_id' => 7,
            'year' => 2023,
            'category_id' => 1,
            'description' => 'Implementasi konsep DevOps dan pipeline CI/CD untuk mempercepat pengembangan perangkat lunak.',
            'cover' => '',
            'status' => 'Available',
            'pages' => 320,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2023-11-20',
            'location' => 'Rak B - 03',
            'call_number' => '005.1 GIT d',
        ]);
        Book::create([
            'title' => 'UI/UX Design Principles',
            'author' => 'Hendra Gunawan',
            'isbn' => '978-602-8901-23-4',
            'publisher_id' => 8,
            'year' => 2024,
            'category_id' => 7,
            'description' => 'Prinsip-prinsip desain antarmuka dan pengalaman pengguna untuk menciptakan produk digital yang menarik dan mudah digunakan.',
            'cover' => '',
            'status' => 'Borrowed',
            'pages' => 260,
            'language' => 'Indonesia',
            'edition' => 'Edisi Pertama',
            'added_date' => '2024-05-10',
            'location' => 'Rak B - 04',
            'call_number' => '005.437 HEN u',
        ]);

        Book::factory(492)->create();

        // Borrowings
        $borrowings = [
            [
                'user_id' => 2,
                'book_id' => 2,
                'status' => 'Borrowed',
                'borrow_date' => '2026-07-01',
                'due_date' => '2026-07-15',
            ],
            [
                'user_id' => 2,
                'book_id' => 5,
                'status' => 'Borrowed',
                'borrow_date' => '2026-07-05',
                'due_date' => '2026-07-19',
            ],
            [
                'user_id' => 3,
                'book_id' => 8,
                'status' => 'Borrowed',
                'borrow_date' => '2026-06-28',
                'due_date' => '2026-07-12',
            ],
            [
                'user_id' => 2,
                'book_id' => 1,
                'status' => 'Returned',
                'borrow_date' => '2026-06-15',
                'due_date' => '2026-06-29',
                'return_date' => '2026-06-28',
            ],
        ];

        foreach ($borrowings as $borrowing) {
            Borrowing::create($borrowing);
        }

        // Fines
        Fine::create([
            'borrowing_id' => 3,
            'amount' => 4000,
            'status' => 'Unpaid',
            'due_date' => '2026-07-19',
        ]);
    }
}
