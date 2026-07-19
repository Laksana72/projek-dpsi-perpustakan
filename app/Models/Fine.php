<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    protected $fillable = ['borrowing_id', 'amount', 'status', 'due_date'];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'due_date' => 'date',
        ];
    }

    public function borrowing()
    {
        return $this->belongsTo(Borrowing::class);
    }
}
