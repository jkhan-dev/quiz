<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        if(! \App\Models\User::where('email','fakedata1@gmail.com')->first()){
            \App\Models\User::factory()->create([
                'name' => fake()->name(),
                'email' => 'fakedata1@gmail.com',
                'email_verified_at' => now(),
                'password' =>Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }
        
    }
}
