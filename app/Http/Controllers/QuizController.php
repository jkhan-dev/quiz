<?php

namespace App\Http\Controllers;

use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function submit(Request $request) {
        $user = Auth::user();
        
        $data =  $request->json()->all();
       foreach ($data as $question => $answer) {
        if(is_array($answer)){
            $answer = json_encode($answer);
        }
        if($answer == '') continue;
        QuizAnswer::create([
            'user_id'=>$user->id,
            'question' => $question,
            'answer' => $answer
        ]);
       }
    }
}
