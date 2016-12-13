<?php

require ('../databaseConnection.php');
$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password1', $salt);
$query = "insert into CareProvider
        values ('Richard','Carragher','12328961','pro','carraghr','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");

$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('12342341', $salt);
$query = "insert into CareProvider
            values ('John','Smite','12354351','sho','jsmite','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('powerpo', $salt);
$query = "insert into CareProvider
            values ('Joe','Smith','125234901','sho','joejoe','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('sessions', $salt);
$query = "insert into CareProvider
            values ('Brain','Water','13454563','sho','brater','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('trucker', $salt);
$query = "insert into CareProvider
            values ('Conor','McGee','35354366','sho','convoy','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('satnav', $salt);
$query = "insert into CareProvider
            values ('Tom','Tomus','12356541','pro','tomtom','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('dublin12', $salt);
$query = "insert into CareProvider
            values ('mark','Duck','1235334','sho','markDuc','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('polandftw', $salt);
$query = "insert into CareProvider
            values ('George','Monkey','3653654','sho','chris','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('facebook', $salt);
$query = "insert into CareProvider
            values ('Eoin','Edwards','1235361','sho','ownED','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('kent12', $salt);
$query = "insert into CareProvider
            values ('Sarah','Clark','34531374','sho','sclark','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('asdwq23a', $salt);
$query = "insert into CareProvider
            values ('Jessica','Ford','42413485','pro','hlihmnklh','$hash','$salt')";
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