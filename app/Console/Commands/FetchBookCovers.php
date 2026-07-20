<?php

namespace App\Console\Commands;

use App\Models\Book;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchBookCovers extends Command
{
    protected $signature = 'books:fetch-covers';
    protected $description = 'Fetch real book covers from Open Library API by title';

    public function handle(): void
    {
        $books = Book::whereNull('cover')->orWhere('cover', '')->get();

        if ($books->isEmpty()) {
            $this->info('No books without covers found.');
            return;
        }

        $bar = $this->output->createProgressBar($books->count());
        $bar->start();

        $found = 0;
        foreach ($books as $book) {
            $coverUrl = $this->searchCover($book->title);
            if ($coverUrl) {
                $book->update(['cover' => $coverUrl]);
                $found++;
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Done! Found covers for {$found} of {$books->count()} books.");
    }

    private function searchCover(string $title): ?string
    {
        try {
            $response = Http::timeout(5)->get('https://openlibrary.org/search.json', [
                'title' => $title,
                'limit' => 1,
            ]);

            if (!$response->successful()) return null;

            $data = $response->json();
            $doc = $data['docs'][0] ?? null;
            if (!$doc) return null;

            $coverId = $doc['cover_i'] ?? null;
            if (!$coverId) return null;

            return "https://covers.openlibrary.org/b/id/{$coverId}-L.jpg";
        } catch (\Exception) {
            return null;
        }
    }
}
