<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Fine;
use App\Models\User;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Http\Request;

class ExcelExportController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if ($token = $request->query('token')) {
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            return $next($request);
        })->only(['books', 'members', 'borrowings', 'returns', 'fines']);
    }

    public function books()
    {
        $books = Book::with(['category', 'publisher'])->latest()->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Buku');

        $headers = ['No', 'Judul', 'Penulis', 'ISBN', 'Tahun', 'Kategori', 'Penerbit', 'Status'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValue(chr(65 + $i) . '1', $h);
        }

        $row = 2;
        foreach ($books as $b) {
            $sheet->setCellValue('A' . $row, $row - 1);
            $sheet->setCellValue('B' . $row, $b->title);
            $sheet->setCellValue('C' . $row, $b->author);
            $sheet->setCellValue('D' . $row, $b->isbn ?? '-');
            $sheet->setCellValue('E' . $row, $b->year);
            $sheet->setCellValue('F' . $row, $b->category->name ?? '-');
            $sheet->setCellValue('G' . $row, $b->publisher->name ?? '-');
            $sheet->setCellValue('H' . $row, $b->status);
            $row++;
        }

        return $this->download($spreadsheet, 'data-buku.xlsx');
    }

    public function members()
    {
        $members = User::whereIn('role', ['user'])->latest()->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Anggota');

        $headers = ['No', 'Nama', 'Email', 'NIM', 'Program Studi', 'Status Keanggotaan', 'Masa Berlaku'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValue(chr(65 + $i) . '1', $h);
        }

        $row = 2;
        foreach ($members as $m) {
            $sheet->setCellValue('A' . $row, $row - 1);
            $sheet->setCellValue('B' . $row, $m->name);
            $sheet->setCellValue('C' . $row, $m->email);
            $sheet->setCellValue('D' . $row, $m->nim ?? '-');
            $sheet->setCellValue('E' . $row, $m->program_studi ?? '-');
            $sheet->setCellValue('F' . $row, $m->membership_status ?? '-');
            $sheet->setCellValue('G' . $row, $m->membership_expiry ?? '-');
            $row++;
        }

        return $this->download($spreadsheet, 'data-anggota.xlsx');
    }

    public function borrowings()
    {
        $borrowings = Borrowing::with(['user', 'book'])->latest()->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Peminjaman');

        $headers = ['No', 'Peminjam', 'Buku', 'Status', 'Tgl Pinjam', 'Jatuh Tempo', 'Tgl Kembali'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValue(chr(65 + $i) . '1', $h);
        }

        $row = 2;
        foreach ($borrowings as $b) {
            $sheet->setCellValue('A' . $row, $row - 1);
            $sheet->setCellValue('B' . $row, $b->user->name ?? '-');
            $sheet->setCellValue('C' . $row, $b->book->title ?? '-');
            $sheet->setCellValue('D' . $row, $b->status);
            $sheet->setCellValue('E' . $row, $b->borrow_date);
            $sheet->setCellValue('F' . $row, $b->due_date);
            $sheet->setCellValue('G' . $row, $b->return_date ?? '-');
            $row++;
        }

        return $this->download($spreadsheet, 'data-peminjaman.xlsx');
    }

    public function returns()
    {
        $returns = Borrowing::with(['user', 'book', 'fine'])
            ->where('status', 'Returned')
            ->latest('return_date')
            ->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Pengembalian');

        $headers = ['No', 'Peminjam', 'Buku', 'Tgl Pinjam', 'Jatuh Tempo', 'Tgl Kembali', 'Status', 'Denda'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValue(chr(65 + $i) . '1', $h);
        }

        $row = 2;
        foreach ($returns as $r) {
            $due = new \Carbon\Carbon($r->due_date);
            $ret = new \Carbon\Carbon($r->return_date);
            $status = $ret->gt($due) ? 'Terlambat' : 'Tepat Waktu';

            $sheet->setCellValue('A' . $row, $row - 1);
            $sheet->setCellValue('B' . $row, $r->user->name ?? '-');
            $sheet->setCellValue('C' . $row, $r->book->title ?? '-');
            $sheet->setCellValue('D' . $row, $r->borrow_date);
            $sheet->setCellValue('E' . $row, $r->due_date);
            $sheet->setCellValue('F' . $row, $r->return_date);
            $sheet->setCellValue('G' . $row, $status);
            $sheet->setCellValue('H' . $row, $r->fine ? $r->fine->amount : 0);
            $row++;
        }

        return $this->download($spreadsheet, 'data-pengembalian.xlsx');
    }

    public function fines()
    {
        $fines = Fine::with(['borrowing.user', 'borrowing.book'])->latest()->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Data Denda');

        $headers = ['No', 'Peminjam', 'Buku', 'Jumlah Denda', 'Status', 'Jatuh Tempo'];
        foreach ($headers as $i => $h) {
            $sheet->setCellValue(chr(65 + $i) . '1', $h);
        }

        $row = 2;
        foreach ($fines as $f) {
            $sheet->setCellValue('A' . $row, $row - 1);
            $sheet->setCellValue('B' . $row, $f->borrowing->user->name ?? '-');
            $sheet->setCellValue('C' . $row, $f->borrowing->book->title ?? '-');
            $sheet->setCellValue('D' . $row, $f->amount);
            $sheet->setCellValue('E' . $row, $f->status === 'Unpaid' ? 'Belum Lunas' : 'Lunas');
            $sheet->setCellValue('F' . $row, $f->due_date);
            $row++;
        }

        return $this->download($spreadsheet, 'data-denda.xlsx');
    }

    private function download(Spreadsheet $spreadsheet, string $filename): StreamedResponse
    {
        $writer = new Xlsx($spreadsheet);

        return new StreamedResponse(function () use ($writer) {
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }
}
