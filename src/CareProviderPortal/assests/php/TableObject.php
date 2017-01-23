<?php

class Row{

    public $row;

    public function __construct($data){
        $this->row = $data;
    }
}

class Table{
    public $header;
    public $rows;

    public function __construct(){
        $this->header = array();
        $this->rows = array();
    }

    public function setHeader($data){
        if(count($this->header) == 0){
            $this->header = $data;
        }
    }

    public function addRow($data){
        $temp = new Row($data);
        array_push($this->rows,$temp);
    }

    public function size(){
        return count($this->rows);
    }
}