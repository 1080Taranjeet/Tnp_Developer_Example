<?php

namespace App\Http\Controllers;

use App\Models\Example;
use Illuminate\Http\Request;

class ExampleController extends Controller
{
    public function index()
{
    // Fetch all examples ordered by 'created_at' in descending order (newest first)
    $examples = Example::orderBy('created_at', 'desc')->get();
    
    return response()->json($examples);
}

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'data' => 'required|string',
        ]);

        $example = Example::create([
            'title' => $request->title,
            'data' => $request->data,
            'current_date' => now(),
        ]);

        return response()->json($example, 201);
    }

    public function destroy($id)
    {
        // Find the record by ID
        $example = Example::find($id);

        if ($example) {
            // Delete the record
            $example->delete();
            return response()->json(['message' => 'Example deleted successfully']);
        } else {
            return response()->json(['message' => 'Example not found'], 404);
        }
    }

    public function Find($id)
    {
        // Find the record by ID
        $example = Example::findOrFail($id);

        return response()->json($example);
    }

    // Update a specific post
    public function update(Request $request, $id)
    {
        // Validate the incoming request data (optional but recommended)
        $request->validate([
            'title' => 'required|string|max:255',
            'data' => 'required|string',
        ]);

        // Find the example by ID
        $example = Example::findOrFail($id);

        // Update the example with new data
        $example->update($request->all());

        // Return the updated example
        return response()->json($example, 200);
    }


}
