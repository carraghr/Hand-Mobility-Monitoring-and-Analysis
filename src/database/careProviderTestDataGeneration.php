<?php

    require ('../databaseConnection.php');
    $cStrong = false;

    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('password1', $sail);
    $query = "insert into CareProvider
    values ('Richard','Carragher','12328961','pro','carraghr','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('12342341', $sail);
    $query = "insert into CareProvider
        values ('John','Smite','12354351','sho','jsmite','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('powerpo', $sail);
    $query = "insert into CareProvider
        values ('Joe','Smith','125234901','sho','joejoe','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('sessions', $sail);
    $query = "insert into CareProvider
        values ('Brain','Water','13454563','sho','brater','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('trucker', $sail);
    $query = "insert into CareProvider
        values ('Conor','McGee','35354366','sho','convoy','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('satnav', $sail);
    $query = "insert into CareProvider
        values ('Tom','Tomus','12356541','pro','tomtom','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('dublin12', $sail);
    $query = "insert into CareProvider
        values ('mark','Duck','1235334','sho','markDuc','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('polandftw', $sail);
    $query = "insert into CareProvider
        values ('George','Monkey','3653654','sho','chris','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('facebook', $sail);
    $query = "insert into CareProvider
        values ('Eoin','Edwards','1235361','sho','ownED','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('kent12', $sail);
    $query = "insert into CareProvider
        values ('Sarah','Clark','34531374','sho','sclark','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $sail = openssl_random_pseudo_bytes(10,$cStrong);
    while(!$cStrong){
        $sail = openssl_random_pseudo_bytes(10,$cStrong);
    }
    $hash = crypt('asdwq23a', $sail);
    $query = "insert into CareProvider
        values ('Jessica','Ford','42413485','pro','hlihmnklh','$hash','$sail')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");



    $query = "insert into Supervisor
            values ('1235334','12328901')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


    $query = "insert into Supervisor
            values ('1235361','12328901')";
    $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into Supervisor
    values ('34531374','12356541')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into Supervisor
    values ('35354366','12328901')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into Supervisor
    values ('3653654','42413485')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into Supervisor
    values ('13454563','42413485')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

    $query = "insert into Supervisor
    values ('125234901','12356541')";
        $queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

