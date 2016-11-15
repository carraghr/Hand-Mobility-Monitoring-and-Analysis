<?php

    class HandExercises{
        private $right =  array();
        private $left = array();

        private $both = array();

        public function addExercise($hand, $exercise){
            if(strcmp($hand,"right") == 0){
                array_push($this->right, $exercise);
            }else if(strcmp($hand,"left") == 0){
                array_push($this->left, $exercise);
            }else if (strcmp($hand,"both") == 0){
                array_push($this->both, $exercise);
            }
        }

        public function exportExercises(){
            $i = (Object)[];
            $i->right = $this->right;
            $i->left = $this->left;
            $i->both = $this->both;

            //array('right'=>$this->right, )

            return json_encode($i);
        }


    }