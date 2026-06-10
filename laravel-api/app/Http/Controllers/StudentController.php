<?php

namespace App\Http\Controllers;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    // GET /api/students   -- get all students
    public function index()
    {
        $students = Student::all();
        return response()->json([
            'success' => true,
            'data' => $students
        ]);
    }


    // POST  api/students --create students
    public function store(Request $request)
    {
        // validating incoming data 
        $validated = $request->validate([
            'name' => 'string|required|max:255',
            'tell' => 'string|required|unique:students',
            'sex' => 'required|string',
            'email' => 'required|string|unique:students'
        ]);

        $student = Student::create($validated);
        return response()->json([
            'success' => true,
            'message' => "student created successfully",
            'data' => $student
        ], 201);
    }


    // GET /api/students/{id}   get single student
    public function show($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'student not found'

            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $student
        ]);
    }

    //  PUT /api/students/{id}

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json([
                'success'  => false,
                'message' => 'student not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'string | required|max:255',
            'tell' => 'string|required',
            'sex' => 'string|required',
            'email' => "string|required|unique:students,email," . $id
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'message' => "student updated success",
            'data' => $student
        ]);
    }

    // DELETE /api/students/{id}

    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => "student not found"
            ], 404);
        }
        $student->delete();
        return response()->json([
            'success' => true,
            'message' => "student deleted success"
        ]);
    }
}