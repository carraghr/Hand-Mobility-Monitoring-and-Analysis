<?php
require ('../databaseConnection.php');

$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password0', $salt);
$query = "insert into Patient values ('p0f','p0l','1232890','12328961','DATE()','patient0','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password1', $salt);
$query = "insert into Patient values ('p1f','p1l','1232891','12328961','DATE()','patient1','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password2', $salt);
$query = "insert into Patient values ('p2f','p2l','1232892','12328961','DATE()','patient2','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password3', $salt);
$query = "insert into Patient values ('p3f','p3l','1232893','12328961','DATE()','patient3','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password4', $salt);
$query = "insert into Patient values ('p4f','p4l','1232894','12328961','DATE()','patient4','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password5', $salt);
$query = "insert into Patient values ('p5f','p5l','1232895','12328961','DATE()','patient5','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password6', $salt);
$query = "insert into Patient values ('p6f','p6l','1232896','12328961','DATE()','patient6','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';

$hash = crypt('password7', $salt);
$query = "insert into Patient values ('p7f','p7l','1232897','12328961','DATE()','patient7','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password8', $salt);
$query = "insert into Patient values ('p8f','p8l','1232898','12328961','DATE()','patient8','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");


$salt = '$6$rounds=5000$'.  bin2hex(random_bytes (16)).'$';
$hash = crypt('password9', $salt);
$query = "insert into Patient values ('p9f','p9l','1232899','12328961','DATE()','patient9','$hash','$salt')";
$queryResult = @mysqli_query($databaseConnection, $query) OR trigger_error($databaseConnection->error."[ $query]");