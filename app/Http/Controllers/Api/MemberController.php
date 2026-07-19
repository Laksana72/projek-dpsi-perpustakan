<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role', 'user');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('nim', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate($request->per_page ?? 10));
    }

    public function show(User $member)
    {
        if ($member->role !== 'user') {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $member->loadCount(['borrowings as total_borrowings'])
               ->load(['borrowings.book']);

        $stats = [
            'total_borrowings' => $member->total_borrowings,
            'active_borrowings' => $member->borrowings->where('status', 'Borrowed')->count(),
            'returned_borrowings' => $member->borrowings->where('status', 'Returned')->count(),
            'total_fines' => $member->fines()->sum('amount'),
        ];

        return response()->json([
            'member' => $member,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:6',
            'nim' => 'nullable|string|unique:users,nim|max:20',
            'program_studi' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'membership_status' => 'nullable|string|max:50',
            'membership_expiry' => 'nullable|date',
        ]);

        $data = $request->all();
        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'user';

        $member = User::create($data);

        return response()->json($member, 201);
    }

    public function update(Request $request, User $member)
    {
        if ($member->role !== 'user') {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $member->id,
            'password' => 'nullable|string|min:6',
            'nim' => 'nullable|string|max:20|unique:users,nim,' . $member->id,
            'program_studi' => 'nullable|string|max:255',
            'avatar' => 'nullable|string|max:255',
            'membership_status' => 'nullable|string|max:50',
            'membership_expiry' => 'nullable|date',
        ]);

        $data = $request->except('password');
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $member->update($data);

        return response()->json($member);
    }

    public function destroy(User $member)
    {
        if ($member->role !== 'user') {
            return response()->json(['message' => 'Member not found'], 404);
        }

        $member->delete();

        return response()->json(['message' => 'Member deleted successfully']);
    }
}
