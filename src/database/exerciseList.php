<?php
    require ('../databaseConnection.php');

    $query = "insert into exercises values ('Finger Separating','Hand','degrees', 'Some Text here' )";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('Tip to Tip','Hand','Hand','centimeters')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('1','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('2','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('3','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('4','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('5','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('6','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('7','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into exercises values ('8','Hand','Hand','nothing')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");