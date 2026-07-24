<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\User;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExcelImportController extends Controller
{
    public function books(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        $file = $request->file('file');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $imported = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            if ($index === 0) continue;

            if (empty($row[1])) continue;

            $category = null;
            if (!empty($row[5])) {
                $category = Category::firstOrCreate(['name' => $row[5]]);
            }

            $publisher = null;
            if (!empty($row[6])) {
                $publisher = Publisher::firstOrCreate(['name' => $row[6]]);
            }

            try {
                Book::create([
                    'title' => $row[1],
                    'author' => $row[2] ?? '',
                    'isbn' => $row[3] ?? null,
                    'year' => $row[4] ?? date('Y'),
                    'category_id' => $category?->id,
                    'publisher_id' => $publisher?->id,
                    'status' => 'Available',
                    'description' => '',
                    'synopsis' => '',
                    'cover' => null,
                ]);
                $imported++;
            } catch (\Exception $e) {
                $errors[] = "Baris " . ($index + 1) . ": " . $e->getMessage();
            }
        }

        return response()->json([
            'message' => "Berhasil mengimpor {$imported} buku" . (count($errors) ? " dengan " . count($errors) . " error" : ""),
            'imported' => $imported,
            'errors' => $errors,
        ]);
    }

    public function members(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        $file = $request->file('file');
        $spreadsheet = IOFactory::load($file->getPathname());
        $sheet = $spreadsheet->getActiveSheet();
        $rows = $sheet->toArray();

        $imported = 0;
        $errors = [];

        foreach ($rows as $index => $row) {
            if ($index === 0) continue;
            if (empty($row[1]) || empty($row[2])) continue;

            try {
                User::create([
                    'name' => $row[1],
                    'email' => $row[2],
                    'password' => bcrypt('password'),
                    'nim' => $row[3] ?? null,
                    'program_studi' => $row[4] ?? null,
                    'role' => 'user',
                    'membership_status' => $row[5] ?? 'Active',
                    'membership_expiry' => $row[6] ?? now()->addYear()->toDateString(),
                ]);
                $imported++;
            } catch (\Exception $e) {
                $errors[] = "Baris " . ($index + 1) . ": " . $e->getMessage();
            }
        }

        return response()->json([
            'message' => "Berhasil mengimpor {$imported} anggota" . (count($errors) ? " dengan " . count($errors) . " error" : ""),
            'imported' => $imported,
            'errors' => $errors,
        ]);
    }
}
