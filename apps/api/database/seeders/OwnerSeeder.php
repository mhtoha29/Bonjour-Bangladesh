<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OwnerSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'farooq@bonjourbangladesh.com'],
            ['name' => 'Syed Moyeenul Farooq', 'role' => 'owner', 'is_active' => true, 'password' => Str::random(80)],
        );
    }
}
