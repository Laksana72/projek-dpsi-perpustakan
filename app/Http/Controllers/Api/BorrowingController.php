<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Fine;
use App\Models\User;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    public function index(Request $request)
    {
        $query = Borrowing::with(['user', 'book', 'fine']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->where('borrow_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('borrow_date', '<=', $request->date_to);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })->orWhereHas('book', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        return response()->json($query->latest()->paginate($request->per_page ?? 10));
    }

    public function show(Borrowing $borrowing)
    {
        return response()->json($borrowing->load(['user', 'book', 'fine']));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ]);

        $borrowing = Borrowing::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'status' => 'Pending',
            'borrow_date' => now()->toDateString(),
            'due_date' => now()->addDays(14)->toDateString(),
        ]);

        return response()->json($borrowing->load(['user', 'book']), 201);
    }

    public function approve(Borrowing $borrowing)
    {
        $borrowing->update([
            'status' => 'Borrowed',
            'borrow_date' => now()->toDateString(),
            'due_date' => now()->addDays(14)->toDateString(),
        ]);

        return response()->json($borrowing->load(['user', 'book']));
    }

    public function reject(Borrowing $borrowing)
    {
        $borrowing->delete();

        return response()->json(['message' => 'Borrowing rejected']);
    }

    public function returnBook(Borrowing $borrowing)
    {
        $borrowing->update([
            'status' => 'Returned',
            'return_date' => now()->toDateString(),
        ]);

        if (now()->startOfDay()->gt($borrowing->due_date)) {
            $daysOverdue = now()->startOfDay()->diffInDays($borrowing->due_date);
            $amount = $daysOverdue * 1000;

            Fine::create([
                'borrowing_id' => $borrowing->id,
                'amount' => $amount,
                'status' => 'Unpaid',
                'due_date' => now()->addDays(7)->toDateString(),
            ]);
        }

        return response()->json($borrowing->load(['user', 'book', 'fine']));
    }

    public function userBorrowings(User $user)
    {
        $borrowings = Borrowing::with(['book', 'fine'])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json($borrowings);
    }
}
