<?php
    DEFINE ('DB_USER','project');
    DEFINE ('DB_PASSWORD','project');
    DEFINE ('DB_HOST','localhost');
    DEFINE ('DB_NAME','project');

    /** @var TYPE_NAME $databaseConnection */
    $databaseConnection = @mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME) OR die ('Could not connect to database: ' . mysqli_connect_error());

    mysqli_set_charset($databaseConnection, 'utf');
?>