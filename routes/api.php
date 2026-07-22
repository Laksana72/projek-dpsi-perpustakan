<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PublisherController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\BorrowingController;
use App\Http\Controllers\Api\ReturnController;
use App\Http\Controllers\Api\FineController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\DashboardController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Public book catalog (no auth required)
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/search', [BookController::class, 'search']);
Route::get('/books/{book}', [BookController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'changePassword']);

    // Dashboard
    Route::get('/dashboard/admin', [DashboardController::class, 'admin'])->middleware('role:admin');
    Route::get('/dashboard/pustakawan', [DashboardController::class, 'pustakawan'])->middleware('role:admin,pustakawan');
    Route::get('/dashboard/user', [DashboardController::class, 'user']);

    // Books (protected mutations only) — admin & pustakawan
    Route::middleware('role:admin,pustakawan')->group(function () {
        Route::post('/books', [BookController::class, 'store']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);

        Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
        Route::apiResource('publishers', PublisherController::class)->except(['index', 'show']);

        Route::post('/borrowings/{borrowing}/approve', [BorrowingController::class, 'approve']);
        Route::post('/borrowings/{borrowing}/reject', [BorrowingController::class, 'reject']);
        Route::post('/borrowings/{borrowing}/return', [BorrowingController::class, 'returnBook']);
        Route::post('/borrowings/{borrowing}/extend', [BorrowingController::class, 'extend']);
        Route::post('/borrowings/{borrowing}/confirm-return', [BorrowingController::class, 'confirmReturn']);

        Route::post('/fines/{fine}/pay', [FineController::class, 'pay']);
    });

    // Categories & Publishers (read-only for all authenticated)
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::get('/publishers', [PublisherController::class, 'index']);
    Route::get('/publishers/{publisher}', [PublisherController::class, 'show']);

    // Members (admin only)
    Route::middleware('admin')->group(function () {
        Route::apiResource('members', MemberController::class);
    });

    // Borrowings
    Route::get('/borrowings/user/{user}', [BorrowingController::class, 'userBorrowings']);
    Route::apiResource('borrowings', BorrowingController::class);

    // Returns
    Route::get('/returns/today', [ReturnController::class, 'today']);
    Route::apiResource('returns', ReturnController::class)->only(['index', 'show']);

    // Fines
    Route::get('/fines/user', [FineController::class, 'userFines']);
    Route::apiResource('fines', FineController::class)->only(['index', 'show']);

    // History
    Route::get('/history/user/{user}', [HistoryController::class, 'userHistory']);
    Route::apiResource('history', HistoryController::class)->only(['index', 'show']);
});
