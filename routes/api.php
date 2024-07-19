<?php

use App\Http\Controllers\Authentication;
use App\Http\Controllers\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [Authentication::class, 'login']);
Route::middleware('auth:sanctum')->post('/submit-quiz', [QuizController::class, 'submit']);

