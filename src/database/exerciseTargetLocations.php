<?php

    require ('../databaseConnection.php');

    $query = "insert into ExerciseTargetLocations values ('Finger Separating','thumb')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('Finger Separating','index')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('Finger Separating','middle')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('Finger Separating','pinky')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");




    $query = "insert into ExerciseTargetLocations values ('1','a')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('1','f')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");
    $query = "insert into ExerciseTargetLocations values ('1','e')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");
    $query = "insert into ExerciseTargetLocations values ('1','d')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");
    $query = "insert into ExerciseTargetLocations values ('1','c')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");
    $query = "insert into ExerciseTargetLocations values ('1','b')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('2', 'w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('3','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('4','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('5','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('6','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('7','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into ExerciseTargetLocations values ('8','w')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");