<?php
    require ('../databaseConnection.php');

    $query = "insert into exercises values ('Finger Separating','degrees')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('Tip to Tip','centimeters')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('1','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('2','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('3','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('4','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('5','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('6','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('7','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('8','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");