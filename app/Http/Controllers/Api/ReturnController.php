<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\Request;

class ReturnController extends Controller
{
    public function index(Request $request)
    {
        $query = Borrowing::with(['user', 'book', 'fine'])
            ->where('status', 'Returned');

        if ($request->filled('date_from')) {
            $query->where('return_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('return_date', '<=', $request->date_to);
        }

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
        if ($borrowing->status !== 'Returned') {
            return response()->json(['message' => 'Return not found'], 404);
        }

        return response()->json($borrowing->load(['user', 'book', 'fine']));
    }

    public function today()
    {
        $returns = Borrowing::with(['user', 'book', 'fine'])
            ->where('status', 'Returned')
            ->whereDate('return_date', now()->toDateString())
            ->latest()
            ->get();

        return response()->json($returns);
    }
}
