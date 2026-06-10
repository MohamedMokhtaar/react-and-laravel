<?php 


use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;

Route::get('/students', [StudentController::class, 'index']);
Route::get("/students/{id}", [StudentController::class, 'show']);
Route::post("/students", [StudentController::class, 'store']);
Route::put("/students/{id}", [StudentController::class, 'update']);
Route::delete("/students/{id}", [StudentController::class, 'destroy']);



// teachers Api
Route::apiResource('teachers', TeacherController::class);