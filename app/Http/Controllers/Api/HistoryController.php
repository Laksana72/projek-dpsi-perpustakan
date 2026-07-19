<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\User;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $query = Borrowing::with(['user', 'book', 'fine'])
            ->whereIn('status', ['Returned', 'Lost']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })->orWhereHas('book', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        return response()->json($query->latest('return_date')->paginate($request->per_page ?? 10));
    }

    public function show(Borrowing $borrowing)
    {
        if (!in_array($borrowing->status, ['Returned', 'Lost'])) {
            return response()->json(['message' => 'History not found'], 404);
        }

        return response()->json($borrowing->load(['user', 'book', 'fine']));
    }

    public function userHistory(User $user)
    {
        $history = Borrowing::with(['book', 'fine'])
            ->where('user_id', $user->id)
            ->whereIn('status', ['Returned', 'Lost'])
            ->latest('return_date')
            ->get();

        return response()->json($history);
    }
}
