<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with(['category', 'publisher']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%")
                  ->orWhere('isbn', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('sort')) {
            $sorts = explode(',', $request->sort);
            foreach ($sorts as $sort) {
                $direction = 'asc';
                if (str_starts_with($sort, '-')) {
                    $direction = 'desc';
                    $sort = substr($sort, 1);
                }
                $query->orderBy($sort, $direction);
            }
        } else {
            $query->latest();
        }

        return response()->json($query->paginate($request->per_page ?? 10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|unique:books,isbn|max:20',
            'publisher_id' => 'nullable|exists:publishers,id',
            'year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'cover' => 'nullable|string|max:255',
            'status' => 'nullable|in:Available,Borrowed,Reserved,Lost',
            'pages' => 'nullable|integer|min:1',
            'language' => 'nullable|string|max:50',
            'edition' => 'nullable|string|max:100',
            'added_date' => 'nullable|date',
            'location' => 'nullable|string|max:100',
            'call_number' => 'nullable|string|max:100',
        ]);

        $book = Book::create($request->all());

        return response()->json($book->load(['category', 'publisher']), 201);
    }

    public function show(Book $book)
    {
        return response()->json($book->load(['category', 'publisher']));
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'required|string|max:20|unique:books,isbn,' . $book->id,
            'publisher_id' => 'nullable|exists:publishers,id',
            'year' => 'nullable|integer|min:1000|max:' . date('Y'),
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'cover' => 'nullable|string|max:255',
            'status' => 'nullable|in:Available,Borrowed,Reserved,Lost',
            'pages' => 'nullable|integer|min:1',
            'language' => 'nullable|string|max:50',
            'edition' => 'nullable|string|max:100',
            'added_date' => 'nullable|date',
            'location' => 'nullable|string|max:100',
            'call_number' => 'nullable|string|max:100',
        ]);

        $book->update($request->all());

        return response()->json($book->load(['category', 'publisher']));
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }

    public function search(Request $request)
    {
        $request->validate(['q' => 'required|string|min:2']);

        $books = Book::with(['category', 'publisher'])
            ->where('title', 'like', "%{$request->q}%")
            ->orWhere('author', 'like', "%{$request->q}%")
            ->orWhere('isbn', 'like', "%{$request->q}%")
            ->paginate(10);

        return response()->json($books);
    }
}
