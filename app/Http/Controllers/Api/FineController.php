<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fine;
use Illuminate\Http\Request;

class FineController extends Controller
{
    public function index(Request $request)
    {
        $query = Fine::with(['borrowing.user', 'borrowing.book']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->paginate($request->per_page ?? 10));
    }

    public function show(Fine $fine)
    {
        return response()->json($fine->load(['borrowing.user', 'borrowing.book']));
    }

    public function pay(Fine $fine)
    {
        $fine->update(['status' => 'Paid']);

        return response()->json($fine->load(['borrowing.user', 'borrowing.book']));
    }

    public function userFines(Request $request)
    {
        $fines = Fine::whereHas('borrowing', function ($q) use ($request) {
            $q->where('user_id', $request->user()->id);
        })->with(['borrowing.book'])->latest()->get();

        return response()->json($fines);
    }
}
