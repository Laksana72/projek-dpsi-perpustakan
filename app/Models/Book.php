<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $fillable = [
        'title', 'author', 'isbn', 'publisher_id', 'year', 'category_id',
        'description', 'cover', 'status', 'pages', 'language', 'edition',
        'added_date', 'location', 'call_number'
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'pages' => 'integer',
            'added_date' => 'date',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }
}
