<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Publisher;
use Illuminate\Http\Request;

class PublisherController extends Controller
{
    public function index()
    {
        return response()->json(Publisher::withCount('books')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $publisher = Publisher::create($request->all());

        return response()->json($publisher, 201);
    }

    public function show(Publisher $publisher)
    {
        return response()->json($publisher->load('books'));
    }

    public function update(Request $request, Publisher $publisher)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $publisher->update($request->all());

        return response()->json($publisher);
    }

    public function destroy(Publisher $publisher)
    {
        $publisher->delete();

        return response()->json(['message' => 'Publisher deleted successfully']);
    }
}
