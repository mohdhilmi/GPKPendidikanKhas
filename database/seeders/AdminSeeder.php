<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Seed admin user.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin GPK',
            'email' => 'admin@gpk.mohdhilmi.com',
            'password' => Hash::make('gpk@admin2024'),
            'role' => 'admin',
            'phone' => '0123456789',
        ]);
    }
}
