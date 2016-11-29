<?php

class target{
    public $location;
    public $target;

    public function __construct($location, $target){
        $this->location = $location;
        $this->target = $target;
    }
}

class Exercise{
    public $Name;
    public $leftHand;
    public $rightHand;
    public $reps;
    public $seq;

    public function __construct($name, $reps, $seq){
        $this->Name = $name;
        $this->reps = $reps;
        $this->seq = $seq;
        $this->leftHand = array();
        $this->rightHand = array();

    }

    public function addTarget($hand, $location, $target){
        $tempComment = new target($location, $target);
        if(strcmp($hand,"right") == 0){
            array_push($this->rightHand, $tempComment);
        }else if(strcmp($hand,"left") == 0){
            array_push($this->leftHand, $tempComment);
        }
    }

    public function isExercise($name){
        return strcmp($this->Name,$name) == 0;
    }
}

class Exercises{

    public $exercises;

    public function __construct(){
        $this->exercises =array();
    }

    public function addExercise($name, $reps, $seqs, $hand, $location, $target){
        $isThere = false;
        for($i=0; $i < count($this->exercises); $i++){
            if($this->exercises[$i]->isExercise($name)){
                $isThere=true;
                $this->exercises[$i]->addTarget($hand, $location, $target);
                break;
            }
        }
        if(!$isThere){
            $temp = new Exercise($name, $reps, $seqs);
            $temp->addTarget( $hand, $location, $target);
            array_push($this->exercises, $temp);
        }
    }

    public function addTarget($name, $hand, $location, $target){
        for($i=0; $i < count($this->exercises); $i++){
            if($this->exercises[$i]->isExercise($name)){
                $this->exercises[$i]->addTarget($hand, $location, $target);
                break;
            }
        }
    }

    public function exportExercises(){
        $i = (Object)[];
        $i->exerciseRecord = $this->exercises;

        return json_encode($i);
    }

}