<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\ExampleController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('/examples', [ExampleController::class, 'index']);
Route::post('/examples', [ExampleController::class, 'store']);
Route::delete('/examples/{id}', [ExampleController::class, 'destroy']);
Route::put('/examples/{id}', [ExampleController::class, 'update']);
Route::get('/examples/{id}', [ExampleController::class, 'Find']);


Route::get('/tables', [TableController::class, 'listTables']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
