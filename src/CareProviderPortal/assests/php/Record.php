<?php

class Data{
    public $name;
    public $data;

    public function __construct($name){
        $this->name = $name;
        $this->data = array();
    }

    public function addData($data){
        array_push($this->data,$data);
    }
}

class Series{
    public $data;

    public function __construct(){
        $this->data = array();
    }

    public function addDataToSeries($seriesName, $data){
        $seriesExist = false;
        foreach($this->data as $value){
            if(strcmp($value->name,$seriesName) == 0){
                $value->addData($data);
                $seriesExist = true;
            }
        }
        if(!$seriesExist){
            $temp = new Data($seriesName);
            $temp->addData($data);
            array_push($this->data,$temp);
        }
    }
}

class Repetition{
    public $name;
    public $categories;

    public function __construct($repetitionName){
        $this->name = $repetitionName;
        $this->categories = array();
    }

    public function addLocation($locationName){
        $locationExist = false;
        foreach($this->categories as $value){
            if(strcmp($value,$locationName) == 0){
                $locationExist = true;
            }
        }
        if(!$locationExist){
            array_push($this->categories, $locationName);
        }
    }
}

class Date{
    public $name;
    public $categories;

    public function __construct($dateTime){
        $this->name = $dateTime;
        $this->categories = array();
    }

    public function addRepetition($repetitionName){
        $repetitionExist = false;
        foreach($this->categories as $value){
            if(strcmp($value->name,$repetitionName) == 0){
                $repetitionExist = true;
            }
        }
        if(!$repetitionExist){
            $temp = new Repetition($repetitionName);
            array_push($this->categories, $temp);
        }
    }

    public function addRepetitionLocation($repetitionName,$location){
        foreach($this->categories as $value){
            if(strcmp($value->name,$repetitionName) == 0){
                $value->addLocation($location);
            }
        }
    }
}