<?php

namespace App\Http\Controllers;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    //
    
    // GET /api/students   -- get all students
    public function index()
    {
        $teachers = Teacher::all();
        return response()->json([
            'success' => true,
            'data' => $teachers
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

        $teacher = Teacher::create($validated);
        return response()->json([
            'success' => true,
            'message' => "student created successfully",
            'data' => $teacher
        ], 201);
    }


    // GET /api/students/{id}   get single student
    public function show($id)
    {
        $teacher = Teacher::find($id);
        if (!$teacher) {
            return response()->json([
                'success' => false,
                'message' => 'student not found'

            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $teacher
        ]);
    }

    //  PUT /api/students/{id}

    public function update(Request $request, $id)
    {
        $teacher = Teacher::find($id);
        if (!$teacher) {
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

        $teacher->update($validated);

        return response()->json([
            'success' => true,
            'message' => "student updated success",
            'data' => $teacher
        ]);
    }

    // DELETE /api/students/{id}

    public function destroy($id)
    {
        $teacher = Teacher::find($id);
        if (!$teacher) {
            return response()->json([
                'success' => false,
                'message' => "student not found"
            ], 404);
        }
        $teacher->delete();
        return response()->json([
            'success' => true,
            'message' => "student deleted success"
        ]);
    }
}