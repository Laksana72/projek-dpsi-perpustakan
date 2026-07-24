<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function avatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = $request->user();
        $path = $request->file('avatar')->store('avatars', 'public');

        if ($user->avatar) {
            \Storage::disk('public')->delete($user->avatar);
        }

        $user->update(['avatar' => $path]);

        return response()->json([
            'message' => 'Foto profil berhasil diperbarui',
            'avatar' => $path,
            'avatar_url' => asset('storage/' . $path),
        ]);
    }

    public function cover(Request $request)
    {
        $request->validate([
            'cover' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
            'book_id' => 'required|exists:books,id',
        ]);

        $book = \App\Models\Book::findOrFail($request->book_id);
        $path = $request->file('cover')->store('covers', 'public');

        if ($book->cover) {
            \Storage::disk('public')->delete($book->cover);
        }

        $book->update(['cover' => $path]);

        return response()->json([
            'message' => 'Cover buku berhasil diperbarui',
            'cover' => $path,
            'cover_url' => asset('storage/' . $path),
        ]);
    }
}
