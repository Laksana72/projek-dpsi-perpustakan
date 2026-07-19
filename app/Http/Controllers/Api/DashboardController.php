<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Fine;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function admin()
    {
        $totalBooks = Book::count();
        $totalMembers = User::where('role', 'user')->count();
        $totalBorrowings = Borrowing::count();
        $totalReturns = Borrowing::where('status', 'Returned')->count();
        $totalOverdue = Borrowing::where('status', 'Borrowed')
            ->whereDate('due_date', '<', now()->toDateString())
            ->count();
        $totalFines = Fine::sum('amount');

        return response()->json([
            'totalBooks' => $totalBooks,
            'totalMembers' => $totalMembers,
            'totalBorrowings' => $totalBorrowings,
            'totalReturns' => $totalReturns,
            'totalOverdue' => $totalOverdue,
            'totalFines' => $totalFines,
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();

        $totalBorrowed = Borrowing::where('user_id', $user->id)->count();
        $activeBorrowings = Borrowing::where('user_id', $user->id)
            ->where('status', 'Borrowed')
            ->count();
        $totalReturned = Borrowing::where('user_id', $user->id)
            ->where('status', 'Returned')
            ->count();
        $totalFines = Fine::whereHas('borrowing', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->sum('amount');
        $pendingFines = Fine::whereHas('borrowing', function ($q) use ($user) {
            $q->where('user_id', $user->id);
        })->where('status', 'Unpaid')->sum('amount');

        return response()->json([
            'totalBorrowed' => $totalBorrowed,
            'activeBorrowings' => $activeBorrowings,
            'totalReturned' => $totalReturned,
            'totalFines' => $totalFines,
            'pendingFines' => $pendingFines,
        ]);
    }
}
