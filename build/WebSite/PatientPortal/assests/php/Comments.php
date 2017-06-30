<?php


class comment{
    //Data structure for comment with message and date time.
    public $date;
    public $time;
    public $message;

    function __construct($date, $time, $comment){
        $this->date =$date;
        $this->time =$time;
        $this->message =$comment;
    }

}

class Comments{

    //Data structure for a collection of comments.

    private $comments =  array();

    public function addComment($Date, $Time, $Comment){
        $tempComment = new Comment($Date, $Time, $Comment);
        array_push($this->comments, $tempComment);
    }

    public function exportExercises(){
        $i = (Object)[];
        $i->feedback = $this->comments;

        return json_encode($i);
    }
}