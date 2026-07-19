<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    protected static array $titles = [];
    protected static array $isbns = [];

    public function definition(): array
    {
        $categories = Category::pluck('id')->toArray();
        $publishers = Publisher::pluck('id')->toArray();

        $title = $this->uniqueTitle();
        $author = fake()->name('male') . ' ' . fake()->lastName();

        return [
            'title' => $title,
            'author' => fake()->randomElement([
                'Andi ' . fake()->lastName(),
                'Budi ' . fake()->lastName(),
                'Citra ' . fake()->lastName(),
                'Dian ' . fake()->lastName(),
                'Eko ' . fake()->lastName(),
                'Fajar ' . fake()->lastName(),
                'Gita ' . fake()->lastName(),
                'Hendra ' . fake()->lastName(),
                'Intan ' . fake()->lastName(),
                'Joko ' . fake()->lastName(),
            ]),
            'isbn' => $this->uniqueIsbn(),
            'publisher_id' => fake()->randomElement($publishers),
            'year' => fake()->numberBetween(2018, 2026),
            'category_id' => fake()->randomElement($categories),
            'description' => fake()->randomElement([
                'Buku ini membahas tentang ' . $title . ' secara mendalam dan komprehensif.',
                'Panduan lengkap memahami ' . $title . ' untuk pemula maupun profesional.',
                'Studi kasus dan implementasi ' . $title . ' dalam pengembangan aplikasi modern.',
                'Pengenalan konsep ' . $title . ' dengan pendekatan praktis dan studi kasus nyata.',
                'Materi ' . $title . ' disajikan secara sistematis dan mudah dipahami.',
                'Referensi utama untuk mempelajari ' . $title . ' di perguruan tinggi.',
                'Buku ' . $title . ' mencakup teori dan praktik terkini di bidangnya.',
            ]),
            'cover' => '',
            'status' => fake()->randomElement(['Available', 'Available', 'Available', 'Borrowed', 'Reserved', 'Lost']),
            'pages' => fake()->numberBetween(100, 600),
            'language' => fake()->randomElement(['Indonesia', 'Inggris']),
            'edition' => fake()->randomElement(['Edisi Pertama', 'Edisi Kedua', 'Edisi Ketiga', 'Edisi Revisi']),
            'added_date' => fake()->dateTimeBetween('-3 years', 'now')->format('Y-m-d'),
            'location' => fake()->randomElement(['Rak A', 'Rak B', 'Rak C', 'Rak D']) . ' - ' . str_pad((string) fake()->numberBetween(1, 20), 2, '0', STR_PAD_LEFT),
            'call_number' => strtoupper(fake()->randomLetter() . fake()->randomLetter() . '.' . fake()->numberBetween(100, 999)) . ' ' . substr($author, 0, 3) . ' ' . strtolower(substr(explode(' ', $title)[0] ?? $title, 0, 3)),
        ];
    }

    protected function uniqueTitle(): string
    {
        $prefixes = [
            'Pemrograman', 'Algoritma', 'Struktur Data', 'Basis Data', 'Jaringan',
            'Keamanan', 'Desain', 'Pengembangan', 'Analisis', 'Optimasi',
            'Sistem', 'Teknologi', 'Komputasi', 'Aplikasi', 'Framework',
            'Microservices', 'Cloud', 'DevOps', 'Machine Learning', 'Deep Learning',
            'Kecerdasan Buatan', 'Data Science', 'Big Data', 'Internet of Things',
            'Cyber Security', 'Blockchain', 'Mobile', 'Web', 'API', 'Database',
        ];
        $suffixes = [
            'Modern', 'Lanjutan', 'Terapan', 'Fundamental', 'Praktis',
            'Komprehensif', 'Mendalam', 'Sistematis', 'Integratif', 'Profesional',
            'Enterprise', 'Scalable', 'Real-time', 'Adaptive', 'Responsive',
            'untuk Pemula', 'untuk Mahasiswa', 'untuk Profesional', 'Teori dan Praktek',
            'Konsep dan Implementasi',
        ];

        $prefix = fake()->randomElement($prefixes);
        $suffix = fake()->randomElement($suffixes);
        return $prefix . ' ' . $suffix;
    }

    protected function uniqueIsbn(): string
    {
        return '978-' . fake()->numberBetween(600, 999) . '-' . fake()->numberBetween(1000, 9999) . '-' . fake()->numberBetween(10, 99) . '-' . fake()->numberBetween(0, 9);
    }
}
